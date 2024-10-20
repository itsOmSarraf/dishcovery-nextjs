import { create } from 'zustand';

interface Recipe {
	// Define your recipe structure here
	dishName: string;
	ingredients: string[];
	instructions: string[];
	nutritionalInfo: {
		calories: number;
		protein: string;
		carbs: string;
		fat: string;
	};
}

interface RecipeStore {
	recipe: Recipe | null;
	setRecipe: (recipe: Recipe) => void;
}

const useRecipeStore = create<RecipeStore>((set) => ({
	recipe: null,
	setRecipe: (recipe) => set({ recipe })
}));

export default useRecipeStore;
