'use server';

import { revalidatePath } from 'next/cache';
import run from './gemini';
export async function submitDishcoveryForm(prevState, formData) {
	try {
		// Process form data
		const formObject = Object.fromEntries(formData);
		const {
			photoPreview,
			isVegetarian,
			mealTime,
			cuisineType,
			dietaryRestrictions,
			servings
		} = formObject;
		run(
			dietaryRestrictions,
			isVegetarian,
			cuisineType,
			mealTime,
			servings,
			photoPreview
		);
		console.log(formObject);
		revalidatePath('/');
		return { message: 'Form submitted successfully!' };
	} catch (error) {
		return { error: 'Failed to submit form. Please try again.' };
	}
}
