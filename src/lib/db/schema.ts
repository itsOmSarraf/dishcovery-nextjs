// lib/schema.ts
import {
	pgTable,
	text,
	integer,
	jsonb,
	boolean,
	timestamp
} from 'drizzle-orm/pg-core';

export const recipeTable = pgTable('recipes', {
	// Primary key - unique URL for the recipe
	url: text('url').primaryKey(),
	// Basic recipe information
	dishName: text('dish_name').notNull(),
	ingredients: text('ingredients').array().notNull(),
	instructions: text('instructions').array().notNull(),
	// Store nutritional info as a JSON object
	nutritionalInfo: jsonb('nutritional_info').notNull().$type<{
		calories: number;
		protein: string;
		carbs: string;
		fat: string;
	}>(),
	// Recipe metadata
	cuisineType: text('cuisine_type'),
	servings: integer('servings'),
	isVegetarian: boolean('is_vegetarian').notNull().default(false),
	dietaryRestrictions: text('dietary_restrictions'),
	totalTime: integer('total_time'), // cooking time in minutes
	user: text('user_id').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	imageUrl: text('image_url'),
	mealTime: text('meal_time')
});

export type DrizzleRecipe = typeof recipeTable.$inferSelect;
export type NewDrizzleRecipe = typeof recipeTable.$inferInsert;
