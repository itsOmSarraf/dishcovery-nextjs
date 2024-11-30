import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Link2, Clock, Users, ChefHat, Utensils } from 'lucide-react';
import Image from 'next/image';

export function RecipeContent({ recipe, onCopyUrl }: any) {
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <Card className="max-w-6xl mx-auto shadow-lg">
                <CardContent className="space-y-8 p-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <div className="top-8 space-y-4">
                                <div className="rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src="https://placeholder.com/100x100.png"
                                        alt={recipe.dishName}
                                        className="w-full h-96 object-cover"
                                        width={10}
                                        height={10}
                                    />
                                </div>
                                {(recipe.dietaryRestrictions !== 'none' || recipe.mealTime) && (
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex flex-wrap gap-2">
                                            {recipe.dietaryRestrictions !== 'none' && (
                                                <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    {recipe.dietaryRestrictions}
                                                </span>
                                            )}
                                            {recipe.mealTime && (
                                                <span className="inline-flex items-center rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                                    {recipe.mealTime}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-8">
                            <CardHeader className="bg-gray-50 rounded-t-lg">
                                <div className="space-y-4">
                                    <CardTitle className="text-3xl font-bold text-gray-800">{recipe.dishName}</CardTitle>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Users className="w-4 h-4" />
                                            <span>{recipe.servings} servings</span>
                                        </div>
                                        {recipe.isVegetarian && (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <ChefHat className="w-4 h-4" />
                                                <span>Vegetarian</span>
                                            </div>
                                        )}
                                        {recipe.cuisineType !== 'any' && (
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Utensils className="w-4 h-4" />
                                                <span>{recipe.cuisineType} cuisine</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                        <ChefHat className="w-5 h-5 text-blue-600" />
                                        Ingredients
                                    </h3>
                                    <ul className="space-y-2">
                                        {recipe.ingredients.map((ingredient: string, index: number) => (
                                            <li key={index} className="flex items-center gap-2 text-gray-700">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-green-600" />
                                        Instructions
                                    </h3>
                                    <ol className="space-y-4">
                                        {recipe.instructions.map((instruction: [], index: number) => (
                                            <li key={index} className="flex gap-4 text-gray-700">
                                                <span className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                                                    {index + 1}
                                                </span>
                                                <span>{instruction}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">Nutritional Information</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                                            <p className="font-medium text-sm text-gray-600 capitalize">{key}</p>
                                            {/* @ts-ignore */}
                                            <p className="text-xl font-semibold text-gray-800">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between pt-6 border-t">
                        <Button variant="outline" asChild className="hover:bg-gray-100">
                            <Link href="/dishcover">Back to Camera</Link>
                        </Button>
                        <Button
                            variant="default"
                            onClick={onCopyUrl}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                        >
                            <span>Share Recipe</span>
                            <Link2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}