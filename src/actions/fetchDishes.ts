// fetchDishes.ts
'use server';

import { db } from '@/lib/db';
import { recipeTable } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { redis } from '@/lib/redis';

export async function fetchRecipes() {
	try {
		// Check Redis for cached recipes
		const cachedRecipes = await redis.get('dishgallery');

		if (cachedRecipes) {
			try {
				// Ensure proper parsing of cached data
				const parsedRecipes = JSON.parse(cachedRecipes as string);
				return { success: true, data: parsedRecipes };
			} catch (parseError) {
				console.error('Error parsing cached recipes:', parseError);
				// If parsing fails, fetch fresh data
				await redis.del('dishgallery'); // Clear invalid cache
			}
		}

		// Fetch fresh data from database
		const recipes = await db
			.select()
			.from(recipeTable)
			.orderBy(desc(recipeTable.createdAt));

		// Ensure the data is serializable before caching
		const serializedRecipes = JSON.stringify(recipes);

		// Verify the data can be parsed before caching
		JSON.parse(serializedRecipes);

		// Cache the verified serializable result
		await redis.set('dishgallery', serializedRecipes, { ex: 3600 });

		return { success: true, data: recipes };
	} catch (error) {
		console.error('Error fetching recipes:', error);
		return { success: false, data: [] };
	}
}
