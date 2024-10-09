'use server';

import { revalidatePath } from 'next/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function submitDishcoveryForm(formData) {
	try {
		// Process form data
		const {
			photo,
			isVegetarian,
			mealTime,
			cuisineType,
			dietaryRestrictions,
			servings
		} = Object.fromEntries(formData);

		// Handle the image file
		const imageFile = photo;
		if (!imageFile) {
			throw new Error('No image provided');
		}

		// Convert image to base64
		const imageArrayBuffer = await imageFile.arrayBuffer();
		const imageBase64 = Buffer.from(imageArrayBuffer).toString('base64');

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
					mimeType: imageFile.type,
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
		return { error: 'Failed to generate recipe. Please try again.' };
	}
}
