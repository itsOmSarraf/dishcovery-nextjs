// lib/recipeStore.ts
import { create } from 'zustand';
import { Recipe } from './types';

interface RecipeStore {
	recipe: Recipe | null;
	setRecipe: (recipe: Recipe) => void;
	clearRecipe: () => void;
}

const useRecipeStore = create<RecipeStore>((set) => ({
	recipe: null,
	setRecipe: (recipe) => set({ recipe }),
	clearRecipe: () => set({ recipe: null })
}));

export default useRecipeStore;
