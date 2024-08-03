'use server';

import { revalidatePath } from 'next/cache';

export async function submitDishcoveryForm(prevState: any, formData: FormData) {
	try {
		// Process form data
		const formObject = Object.fromEntries(formData);
		const {
			photoPreview,
			isVegetarian,
			mealType,
			cuisineType,
			dietaryRestrictions
		} = formObject;
		revalidatePath('/');

		return { message: 'Form submitted successfully!' };
	} catch (error) {
		return { error: 'Failed to submit form. Please try again.' };
	}
}
