'use server';

import { revalidatePath } from 'next/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function submitDishcoveryForm(prevState, formData) {
	try {
		// Extract form data
		const photoPreview = formData.get('photoPreview');
		const isVegetarian = formData.get('isVegetarian') === 'on';
		const servings = formData.get('servings');
		const mealTime = formData.get('mealTime');
		const cuisineType = formData.get('cuisineType');
		const dietaryRestrictions = formData.get('dietaryRestrictions');

		// Validate required fields
		if (!photoPreview) {
			throw new Error('No image provided');
		}

		// The photoPreview is already a base64 string, so we can use it directly
		const imageBase64 = photoPreview.split(',')[1]; // Remove the data:image/jpeg;base64, part

		// Prepare the prompt for Gemini
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

		// Call Gemini API
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
		const result = await model.generateContent([
			{
				inlineData: {
					mimeType: 'image/jpeg', // Assuming JPEG, adjust if needed
					data: imageBase64
				}
			},
			{ text: prompt }
		]);

		const response = await result.response;
		const recipeText = response.text();

		// Parse the JSON response
		let recipe;
		try {
			recipe = JSON.parse(recipeText);
		} catch (error) {
			console.error('Failed to parse Gemini response:', error);
			recipe = { error: 'Failed to generate recipe', rawText: recipeText };
		}

		console.log('Generated recipe:', recipe);
		revalidatePath('/');
		return { message: 'Recipe generated successfully!', recipe };
	} catch (error) {
		console.error('Error in submitDishcoveryForm:', error);
		return {
			error: error.message || 'Failed to generate recipe. Please try again.'
		};
	}
}
