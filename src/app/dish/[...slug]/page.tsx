'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Link2, Loader2 } from 'lucide-react';
import type { DrizzleRecipe } from '@/lib/db/schema';
import { fetchRecipe } from '@/actions/recipeUrl';
import { useToast } from '@/components/ui/use-toast';

export default function RecipePage({ params }: { params: { slug: string } }) {
    const [recipe, setRecipe] = useState<DrizzleRecipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        async function loadRecipe() {
            try {
                const result = await fetchRecipe(params.slug);
                if (result.success && result.data) {
                    setRecipe(result.data);
                }
            } catch (error) {
                console.error('Error loading recipe:', error);
                notFound();
            } finally {
                setIsLoading(false);
            }
        }

        loadRecipe();
    }, [params.slug]);

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "URL Copied",
            description: "Recipe URL has been copied to clipboard",
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!recipe) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{recipe.dishName}</CardTitle>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{recipe.servings} servings</span>
                        {recipe.isVegetarian && <span>• Vegetarian</span>}
                        {recipe.cuisineType !== 'any' && (
                            <span>• {recipe.cuisineType} cuisine</span>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Ingredients Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                        <ul className="list-disc pl-5">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="mb-1">{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                        <ol className="list-decimal pl-5">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="mb-2">{instruction}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Nutritional Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium text-sm text-gray-600">Calories</p>
                                <p className="text-lg">{recipe.nutritionalInfo.calories}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium text-sm text-gray-600">Protein</p>
                                <p className="text-lg">{recipe.nutritionalInfo.protein}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium text-sm text-gray-600">Carbs</p>
                                <p className="text-lg">{recipe.nutritionalInfo.carbs}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium text-sm text-gray-600">Fat</p>
                                <p className="text-lg">{recipe.nutritionalInfo.fat}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    {(recipe.dietaryRestrictions !== 'none' || recipe.mealTime) && (
                        <div className="border-t pt-4">
                            <div className="flex flex-wrap gap-2">
                                {recipe.dietaryRestrictions !== 'none' && (
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {recipe.dietaryRestrictions}
                                    </span>
                                )}
                                {recipe.mealTime && (
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                        {recipe.mealTime}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 border-t">
                        <Button variant="outline" asChild>
                            <Link href="/dishcover">Back to Camera</Link>
                        </Button>
                        <Button
                            variant="default"
                            onClick={handleCopyUrl}
                            className="flex items-center gap-2"
                        >
                            <span>Copy URL</span>
                            <Link2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}