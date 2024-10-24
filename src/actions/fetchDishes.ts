'use server';

import { db } from '@/lib/db/index';
import { recipeTable } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function fetchRecipes() {
	try {
		const recipes = await db
			.select()
			.from(recipeTable)
			.orderBy(desc(recipeTable.createdAt));
		return { success: true, data: recipes };
	} catch (error) {
		console.error('Error fetching recipes:', error);
		return { success: false, data: [] };
	}
}
