import { db } from '@/lib/db';
import { recipeTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function RecipePage({ params }: { params: { slug: string } }) {
    const recipe = await db.select().from(recipeTable).where(eq(recipeTable.url, params.slug)).limit(1);

    // Since we're using limit(1), we need to get the first result
    const recipeData = recipe[0];

    if (!recipeData) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{recipeData.dishName}</CardTitle>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{recipeData.servings} servings</span>
                        {recipeData.isVegetarian && <span>• Vegetarian</span>}
                        {recipeData.cuisineType !== 'any' && (
                            <span>• {recipeData.cuisineType} cuisine</span>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Ingredients Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                        <ul className="list-disc pl-5">
                            {recipeData.ingredients.map((ingredient, index) => (
                                <li key={index} className="mb-1">{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                        <ol className="list-decimal pl-5">
                            {recipeData.instructions.map((instruction, index) => (
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
                                <p className="text-lg">{recipeData.nutritionalInfo.calories}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium text-sm text-gray-600">Protein</p>
                                <p className="text-lg">{recipeData.nutritionalInfo.protein}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium text-sm text-gray-600">Carbs</p>
                                <p className="text-lg">{recipeData.nutritionalInfo.carbs}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium text-sm text-gray-600">Fat</p>
                                <p className="text-lg">{recipeData.nutritionalInfo.fat}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    {(recipeData.dietaryRestrictions !== 'none' || recipeData.mealTime) && (
                        <div className="border-t pt-4">
                            <div className="flex flex-wrap gap-2">
                                {recipeData.dietaryRestrictions !== 'none' && (
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {recipeData.dietaryRestrictions}
                                    </span>
                                )}
                                {recipeData.mealTime && (
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                                        {recipeData.mealTime}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 border-t">
                        <Button variant="outline" asChild>
                            <Link href="/">Back to Camera</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}