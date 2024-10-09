import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const imageFile = formData.get('image') as File;
		const dietaryRestrictions = formData.get('dietaryRestrictions') as string;
		const isVegetarian = formData.get('isVegetarian') as string;
		const cuisineType = formData.get('cuisineType') as string;
		const mealTime = formData.get('mealTime') as string;
		const servings = formData.get('servings') as string;

		if (!imageFile) {
			return NextResponse.json(
				{ message: 'No image provided' },
				{ status: 400 }
			);
		}

		const imageBytes = await imageFile.arrayBuffer();
		const base64Image = Buffer.from(imageBytes).toString('base64');

		const model = genAI.getGenerativeModel({
			model: 'gemini-1.5-flash',
			generationConfig: { responseMimeType: 'application/json' }
		});

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

		const result = await model.generateContent([
			{
				inlineData: {
					mimeType: imageFile.type,
					data: base64Image
				}
			},
			{ text: prompt }
		]);

		const response = await result.response;
		const text = response.text();

		let jsonResponse;
		try {
			jsonResponse = JSON.parse(text);
		} catch (error) {
			jsonResponse = { error: 'Failed to parse JSON response', rawText: text };
		}

		return NextResponse.json(jsonResponse);
	} catch (error) {
		console.error('Error in Gemini API:', error);
		return NextResponse.json(
			{ message: 'Internal Server Error', error: (error as Error).message },
			{ status: 500 }
		);
	}
}
