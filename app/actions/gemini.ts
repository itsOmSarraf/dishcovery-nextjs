import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileToGenerativePart } from './fileUtils';
// Importing the fileToGenerativePart function
const GEMINI_API_KEY = process.env.GEMINI_API_KEY_GEMINI as string;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
async function run(
	nonVeg: boolean,
	typeFood: string,
	timeFood: string,
	servings: number,
	imageData: Buffer
) {
	const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

	const prompt = `suggest me a ${
		nonVeg ? 'nonveg' : 'veg'
	} recipe for ${typeFood} dish for ${timeFood} for ${servings} people with these ingredients in a json object,format and have a title case for each and keep the measuring terms in grams/kilograms, tablespoons literes/milliliters , the object format shall be 
	{ what_you_saw_in_the_image:"seperate with commas",recipeName:"",oneLiner:"",approxCookingTime:"mins/hrs",approxCalroies:"",serving:"",ingredients:[{name:,quantity:},{name:,quantity:}],instructions:[{step:},{step:}],nonVeg:${nonVeg},typeFood:${typeFood},timeFood:${timeFood}}
	`;
	try {
		const generativePart = await fileToGenerativePart(
			imageData.toString('base64'),
			'image/jpeg'
		);
		const result = await model.generateContent([prompt, generativePart]);

		const response = result.response;
		const text = response.text();
		console.log(text);
		return text;
	} catch (error) {
		console.error('Error in run function:', error);
		throw error; // Re-throw the error to be caught by the calling function
	}
}

export default run;
