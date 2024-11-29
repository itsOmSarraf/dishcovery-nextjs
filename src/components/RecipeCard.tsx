import { Clock, Utensils, ChefHat, Flame, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DrizzleRecipe } from '@/lib/db/schema';

const RecipeCard = ({ recipe, variants }: { recipe: DrizzleRecipe; variants?: any }) => {
    return (
        <motion.div variants={variants}>
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
    );
};

export default RecipeCard;