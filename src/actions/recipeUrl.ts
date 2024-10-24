'use server';

import { db } from '@/lib/db';
import { recipeTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
// import type { DrizzleRecipe } from '@/lib/db/schema';

export async function fetchRecipe(slug: string) {
	try {
		const recipe = await db
			.select()
			.from(recipeTable)
			.where(eq(recipeTable.url, slug))
			.limit(1);

		return {
			success: true,
			data: recipe[0] || null
		};
	} catch (error) {
		console.error('Error fetching recipe:', error);
		return {
			success: false,
			data: null
		};
	}
}
