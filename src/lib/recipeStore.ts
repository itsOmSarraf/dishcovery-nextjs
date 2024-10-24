import { create } from 'zustand';
import { Recipe } from './types';

interface RecipeState {
	recipe: Recipe | null;
	setRecipe: (recipe: Recipe) => void;
}

const useRecipeStore = create<RecipeState>((set) => ({
	recipe: null,
	setRecipe: (recipe) => set({ recipe })
}));

export default useRecipeStore;
