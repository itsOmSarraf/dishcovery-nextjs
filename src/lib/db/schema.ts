import {
	pgTable,
	text,
	integer,
	jsonb,
	boolean,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: varchar('email', { length: 255 }).unique().notNull(),
	username: varchar('username', { length: 50 }).unique().notNull(),
	name: text('name').notNull(),
	avatarUrl: text('avatar_url'),
	createdAt: timestamp('created_at').defaultNow()
});

export const recipeTable = pgTable('recipes', {
	url: text('url').primaryKey(),
	dishName: text('dish_name').notNull(),
	ingredients: text('ingredients').array().notNull(),
	instructions: text('instructions').array().notNull(),
	nutritionalInfo: jsonb('nutritional_info').notNull().$type<{
		calories: number;
		protein: string;
		carbs: string;
		fat: string;
	}>(),
	cuisineType: text('cuisine_type'),
	servings: integer('servings'),
	isVegetarian: boolean('is_vegetarian').notNull().default(false),
	dietaryRestrictions: text('dietary_restrictions'),
	totalTime: integer('total_time'),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id), // Changed this line
	createdAt: timestamp('created_at').defaultNow(),
	imageUrl: text('image_url'),
	mealTime: text('meal_time')
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type DrizzleRecipe = typeof recipeTable.$inferSelect;
export type NewDrizzleRecipe = typeof recipeTable.$inferInsert;
