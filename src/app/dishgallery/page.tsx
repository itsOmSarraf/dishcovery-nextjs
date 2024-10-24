'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Utensils, ChefHat, Flame, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { DrizzleRecipe } from '@/lib/db/schema';
import { fetchRecipes } from '@/actions/fetchDishes';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function DishGallery() {
    const [recipes, setRecipes] = useState<DrizzleRecipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadRecipes() {
            try {
                const result = await fetchRecipes();
                if (result.success) {
                    setRecipes(result.data);
                }
            } catch (error) {
                console.error('Error loading recipes:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadRecipes();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Dishcovery Gallery
                </h1>
                <p className="text-gray-600">
                    Explore our collection of amazing recipes
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {recipes.map((recipe) => (
                    <motion.div key={recipe.url} variants={item}>
                        <Link href={`/dish/${recipe.url}`}>
                            <Card className="hover:shadow-lg transition-all duration-200 overflow-hidden group hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                                {recipe.dishName}
                                            </h2>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                {recipe.cuisineType && recipe.cuisineType !== 'any' && (
                                                    <span className="flex items-center gap-1">
                                                        <Award className="w-4 h-4" />
                                                        {recipe.cuisineType}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                                            <ChefHat className="w-6 h-6 text-blue-500" />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                                        {recipe.totalTime && (
                                            <div className="flex items-center gap-1.5 text-gray-700">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                <span>{recipe.totalTime} min</span>
                                            </div>
                                        )}
                                        {recipe.servings && (
                                            <div className="flex items-center gap-1.5 text-gray-700">
                                                <Utensils className="w-4 h-4 text-blue-500" />
                                                <span>{recipe.servings} servings</span>
                                            </div>
                                        )}
                                        {recipe.isVegetarian && (
                                            <div className="flex items-center gap-1.5 text-green-700">
                                                <Flame className="w-4 h-4 text-green-500" />
                                                <span>Vegetarian</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {recipe.cuisineType && recipe.cuisineType !== 'any' && (
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                                {recipe.cuisineType}
                                            </span>
                                        )}
                                        {recipe.dietaryRestrictions && recipe.dietaryRestrictions !== 'none' && (
                                            <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                                                {recipe.dietaryRestrictions}
                                            </span>
                                        )}
                                        {recipe.mealTime && (
                                            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                                                {recipe.mealTime}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {recipes.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 mt-12 py-16"
                >
                    <ChefHat className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-xl font-medium mb-2">No recipes found</p>
                    <p className="text-gray-400 mb-4">Let&apos;s create your first amazing recipe!</p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        Create Recipe
                    </Link>
                </motion.div>
            )}
        </div>
    );
}