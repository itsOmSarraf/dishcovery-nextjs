export interface GeminiPrompts {
	isVegetarian: boolean;
	mealTime: string;
	cuisineType: string;
	servings: number;
	dietaryRestrictions: string;
	photoBuffer: string;
}
export interface Recipe {
	dishName: string;
	url: string;
	ingredients: string[];
	instructions: string[];
	nutritionalInfo: {
		calories: number;
		protein: string;
		carbs: string;
		fat: string;
	};
}

export interface FormState {
	success: boolean;
	error: string | null;
	recipe: Recipe | null;
}

export interface FormData {
	photoPreview: string | null;
	isVegetarian: boolean;
	servings: number;
	mealTime: string;
	cuisineType: string;
	dietaryRestrictions: string;
}
