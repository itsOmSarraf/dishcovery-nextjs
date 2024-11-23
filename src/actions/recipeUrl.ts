'use server';

import { db } from '@/lib/db';
import { recipeTable } from '@/lib/db/schema';
import type { DrizzleRecipe } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redis } from '@/lib/redis';

// Type guard for single recipe
function isValidRecipe(data: unknown): data is DrizzleRecipe {
	if (!data || typeof data !== 'object') return false;

	const recipe = data as Partial<DrizzleRecipe>;
	return (
		typeof recipe.url === 'string' &&
		typeof recipe.dishName === 'string' && // Corrected from 'title' to 'dishName' based on schema
		typeof recipe.createdAt === 'string'
		// Add other required field validations based on your schema
	);
}

export async function fetchRecipe(slug: string) {
	if (!slug) {
		return {
			success: false,
			data: null,
			error: 'Invalid slug provided'
		};
	}

	const cacheKey = `recipe:${slug}`;

	try {
		// Check Redis for cached recipe
		const cachedRecipe = await redis.get(cacheKey);

		if (cachedRecipe) {
			try {
				const parsedRecipe = JSON.parse(cachedRecipe as string);

				// Validate parsed data structure
				if (isValidRecipe(parsedRecipe)) {
					return {
						success: true,
						data: parsedRecipe
					};
				} else {
					// Invalid cache data structure, remove it
					await redis.del(cacheKey);
					console.warn(`Invalid cache structure for recipe: ${slug}`);
				}
			} catch (parseError) {
				// Handle JSON parse errors
				console.error('Error parsing cached recipe:', parseError);
				await redis.del(cacheKey);
			}
		}

		// Fallback to database query
		const recipe = await db
			.select()
			.from(recipeTable)
			.where(eq(recipeTable.url, slug))
			.limit(1);

		const recipeData = recipe[0];

		// If recipe found, validate and cache it
		if (recipeData) {
			try {
				// Verify the data is serializable
				const serializedRecipe = JSON.stringify(recipeData);
				const parsedRecipe = JSON.parse(serializedRecipe);

				// Validate structure before caching
				if (isValidRecipe(parsedRecipe)) {
					// Cache the verified serializable result
					await redis.set(cacheKey, serializedRecipe, {
						ex: 3600, // 1 hour TTL
						nx: true // Only set if key doesn't exist
					});
				} else {
					console.warn(`Invalid data structure for recipe: ${slug}`);
				}
			} catch (cacheError) {
				console.error('Error caching recipe:', cacheError);
				// Continue without caching
			}
		}

		return {
			success: true,
			data: recipeData || null
		};
	} catch (error) {
		console.error('Error fetching recipe:', error);

		// Handle different types of errors
		if (error instanceof Error) {
			return {
				success: false,
				data: null,
				error: error.message
			};
		}

		return {
			success: false,
			data: null,
			error: 'An unexpected error occurred'
		};
	}
}
