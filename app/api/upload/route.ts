import { GoogleGenerativeAI } from '@google/generative-ai';

// Log the API key (only for debugging, remove in production)
console.log('API Key:', process.env.GOOGLE_API_KEY);

// Initialize the API with a fallback for easier debugging
const API_KEY = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function Gemini(b64, mimeType) {
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
		console.log(result.response.text());
		return result.response.text();
	} catch (error) {
		console.error('Error details:', error.message);
		throw error;
	}
}
wh;
