'use server';

import { revalidatePath } from 'next/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '@/lib/types';

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

		if (!photoPreview) {
			throw new Error('No image provided');
		}

		const imageBase64 = photoPreview.split(',')[1];

		const prompt = `
      Analyze this image of a dish and provide a recipe based on the following criteria:
      - Dietary restrictions: ${dietaryRestrictions}
      - Vegetarian: ${isVegetarian}
      - Cuisine type: ${cuisineType}
      - Meal time: ${mealTime}
      - Number of servings: ${servings}

      Please provide the recipe in JSON format with the following structure:
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
      }
    `;

		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
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

		let recipe: Recipe;
		try {
			const parsedRecipe = JSON.parse(recipeText);
			const uuid = `${uuidv4().substring(0, 6)}`;
			const slug = slugify(parsedRecipe.dishName);

			recipe = {
				...parsedRecipe,
				url: `${slug}-${uuid}`
			};
		} catch (error) {
			console.error('Failed to parse Gemini response:', error);
			return {
				success: false,
				error: 'Failed to generate recipe',
				recipe: null
			};
		}

		revalidatePath('/');
		return { success: true, error: null, recipe };
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
