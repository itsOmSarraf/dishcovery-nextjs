'use server';

import { revalidatePath } from 'next/cache';
import Together from 'together-ai';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '@/lib/types';
import { db } from '@/lib/db/index';
import { recipeTable } from '@/lib/db/schema';

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

interface FormState {
	success: boolean;
	error: string | null;
	recipe: Recipe | null;
}

// Helper function to clean and parse JSON from Llama response
function cleanAndParseJSON(text: string): any {
	// Remove any markdown code block markers
	let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');

	// Remove any leading/trailing whitespace
	cleaned = cleaned.trim();

	// Try to find the JSON object boundaries
	const startIdx = cleaned.indexOf('{');
	const endIdx = cleaned.lastIndexOf('}');

	if (startIdx === -1 || endIdx === -1) {
		throw new Error('No valid JSON object found in response');
	}

	// Extract just the JSON object
	cleaned = cleaned.slice(startIdx, endIdx + 1);

	try {
		return JSON.parse(cleaned);
	} catch (error) {
		console.error('Failed to parse cleaned JSON:', cleaned);
		throw error;
	}
}

async function uploadToImgur(base64Image: string) {
	const clientId = process.env.IMGUR_CLIENT_ID;

	// Remove the data:image/jpeg;base64 prefix if present
	const imageData = base64Image.split(',')[1] || base64Image;

	const response = await fetch('https://api.imgur.com/3/image', {
		method: 'POST',
		headers: {
			Authorization: `Client-ID ${clientId}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			image: imageData,
			type: 'base64'
		})
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.data.error || 'Failed to upload image to Imgur');
	}

	return data.data.link;
}

export async function submitDishcoveryForm(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	try {
		const photoPreview = formData.get('photoPreview') as string;
		const isVegetarian = formData.get('isVegetarian') === 'on';
		const servings = formData.get('servings') as string;
		const mealTime = formData.get('mealTime') as string;
		const cuisineType = formData.get('cuisineType') as string;
		const dietaryRestrictions = formData.get('dietaryRestrictions') as string;
		const userId = 'default-user'; // Replace with actual user ID from auth

		if (!photoPreview) {
			throw new Error('No image provided');
		}

		// Upload image to Imgur first
		const imgurUrl = await uploadToImgur(photoPreview);
		console.log(imgurUrl);
		const prompt = `
        Analyze this image of a dish and provide a recipe based on the following criteria:
        - Dietary restrictions: ${dietaryRestrictions}
        - Vegetarian: ${isVegetarian}
        - Cuisine type: ${cuisineType}
        - Meal time: ${mealTime}
        - Number of servings: ${servings}

        Provide ONLY a JSON response with this exact structure. Do not include any additional text, explanations, or markdown:
        {
            "dishName": "Name of the dish",
            "ingredients": ["list", "of", "ingredients"],
            "instructions": ["step 1", "step 2", "..."],
            "nutritionalInfo": {
                "calories": 000,
                "protein": "00g",
                "carbs": "00g",
                "fat": "00g"
            }
        }`;
		// @ts-ignore
		const response = await together.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: [
						{ type: 'text', text: prompt },
						{
							type: 'image_url',
							image_url: { url: imgurUrl }
						}
					]
				}
			],
			model: 'meta-llama/Llama-Vision-Free',
			max_tokens: null,
			temperature: 0.7,
			top_p: 0.7,
			top_k: 50,
			repetition_penalty: 1,
			stop: ['<|eot_id|>', '<|eom_id|>']
		});

		const recipeText = response.choices[0]?.message?.content || '';

		try {
			const parsedRecipe = cleanAndParseJSON(recipeText);

			// Validate the parsed recipe has required fields
			if (
				!parsedRecipe.dishName ||
				!Array.isArray(parsedRecipe.ingredients) ||
				!Array.isArray(parsedRecipe.instructions) ||
				!parsedRecipe.nutritionalInfo
			) {
				throw new Error('Invalid recipe format in response');
			}

			const uuid = `${uuidv4().substring(0, 6)}`;
			const slug = slugify(parsedRecipe.dishName);
			const url = `${slug}-${uuid}`;

			const recipe = {
				...parsedRecipe,
				url
			};

			// Insert recipe into database
			await db.insert(recipeTable).values({
				url,
				dishName: parsedRecipe.dishName,
				ingredients: parsedRecipe.ingredients,
				instructions: parsedRecipe.instructions,
				nutritionalInfo: parsedRecipe.nutritionalInfo,
				cuisineType,
				servings: parseInt(servings),
				isVegetarian,
				dietaryRestrictions,
				mealTime,
				user: userId,
				imageUrl: imgurUrl
			});

			revalidatePath('/');
			return { success: true, error: null, recipe };
		} catch (error) {
			console.error('Failed to parse or validate recipe:', error);
			return {
				success: false,
				error: 'Failed to generate valid recipe format',
				recipe: null
			};
		}
	} catch (error) {
		console.error('Error in submitDishcoveryForm:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to generate recipe',
			recipe: null
		};
	}
}
