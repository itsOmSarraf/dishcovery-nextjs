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
