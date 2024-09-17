import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge'; // Optional: Use Edge runtime

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(request: NextRequest) {
	try {
		const { imageBase64, mimeType, prompt } = await request.json();

		if (!imageBase64 || !mimeType) {
			return NextResponse.json(
				{ message: 'No image data provided' },
				{ status: 400 }
			);
		}

		const model = genAI.getGenerativeModel({
			model: 'gemini-1.5-flash',
			generationConfig: { responseMimeType: 'application/json' },
			systemInstruction:
				'You use simple English and very simple words. Keep your answers short and to the point. Keep all your sentences very short.'
		});

		const result = await model.generateContent([
			{
				inlineData: {
					mimeType: mimeType,
					data: imageBase64
				}
			},
			{ text: prompt || 'What is in this image? Describe it in detail.' }
		]);

		const response = await result.response;
		const text = response.text();

		console.log(text);

		// Parse the JSON response
		let jsonResponse;
		try {
			jsonResponse = JSON.parse(text);
		} catch (error) {
			jsonResponse = { description: text };
		}
		console.log(jsonResponse);

		return NextResponse.json(jsonResponse);
	} catch (error) {
		console.error('Error in Gemini API:', error);
		return NextResponse.json(
			{ message: 'Internal Server Error', error: (error as Error).message },
			{ status: 500 }
		);
	}
}
