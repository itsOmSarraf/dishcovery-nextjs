'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { db } from '@/lib/db/index'; 
import { recipeTable } from '@/lib/db/schema';
import { FormState } from '@/lib/types';

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
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

		// The image data will be in base64 format
		const imageData = photoPreview.split(',')[1] || photoPreview;

		const model = google('gemini-1.5-flash-latest');

		const prompt = `
      Analyze this image of a dish and provide a recipe based on the following criteria:
      - Dietary restrictions: ${dietaryRestrictions}
      - Vegetarian: ${isVegetarian}
      - Cuisine type: ${cuisineType}
      - Meal time: ${mealTime}
      - Number of servings: ${servings}

      Give a good dish with detailed instructions.
    `;

		try {
			const recipe = await generateObject({
				model,
				messages: [
					{
						role: 'user',
						content: [
							{ type: 'text', text: prompt },
							{
								type: 'image_url',
								image_url: { url: `data:image/jpeg;base64,${imageData}` }
							}
						]
					}
				]
			});

			const uuid = `${uuidv4().substring(0, 6)}`;
			const slug = slugify(recipe.dishName);
			const url = `${slug}-${uuid}`;

			// Insert recipe into database
			await db.insert(recipeTable).values({
				url,
				dishName: recipe.dishName,
				ingredients: recipe.ingredients,
				instructions: recipe.instructions,
				nutritionalInfo: recipe.nutritionalInfo,
				cuisineType,
				servings: parseInt(servings),
				isVegetarian,
				dietaryRestrictions,
				mealTime,
				userId,
				imageUrl: photoPreview // Store the base64 image directly
			});

			revalidatePath('/');
			return {
				success: true,
				error: null,
				recipe: {
					...recipe,
					url,
					user: userId
				}
			};
		} catch (error) {
			console.error('Failed to generate or validate recipe:', error);
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
