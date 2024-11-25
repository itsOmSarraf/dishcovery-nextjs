'use server';

import { revalidatePath } from 'next/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '@/lib/types';
import { db } from '@/lib/db/index';
import { recipeTable } from '@/lib/db/schema';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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

// Helper function to clean and parse JSON from Gemini response
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

		const imageBase64 = photoPreview.split(',')[1];
		const imageUrl = ''; // Replace with actual image upload logic

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

		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
		const result = await model.generateContent([
			{
				inlineData: {
					mimeType: 'image/jpeg',
					data: imageBase64
				}
			},
			{ text: prompt }
		]);

		const response = await result.response;
		const recipeText = response.text();

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
				imageUrl
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
