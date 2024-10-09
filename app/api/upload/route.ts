import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the API with a fallback for easier debugging
const API_KEY = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(request: Request) {
	const { b64, mimeType } = await request.json();

	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

	const imagePart = {
		inlineData: {
			data: b64,
			mimeType: mimeType
		}
	};

	const prompt = 'What do you see here?';

	try {
		const result = await model.generateContent([imagePart, prompt]);
		const responseText = result.response.text();
		console.log(responseText);
		return NextResponse.json({ result: responseText }, { status: 200 });
	} catch (error: any) {
		console.error('Error details:', error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
