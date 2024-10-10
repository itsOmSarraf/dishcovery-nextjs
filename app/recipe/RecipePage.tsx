import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useRecipeStore from '@/lib/recipeStore';

const RecipePage: React.FC = () => {
    const { recipe } = useRecipeStore();

    if (!recipe) {
        return <div>Loading recipe...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>{recipe.dishName || 'Unnamed Dish'}</CardTitle>
                    <CardDescription>Your personalized recipe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
                        <ScrollArea className="h-48 rounded-md border p-4">
                            <ul className="space-y-2">
                                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                                    recipe.ingredients.map((ingredient: string, index: number) => (
                                        <li key={index} className="flex items-center">
                                            <span className="mr-2">•</span>
                                            {ingredient}
                                        </li>
                                    ))
                                ) : (
                                    <li>No ingredients available</li>
                                )}
                            </ul>
                        </ScrollArea>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
                        <ScrollArea className="h-48 rounded-md border p-4">
                            <ol className="list-decimal list-inside space-y-2">
                                {recipe.instructions && recipe.instructions.length > 0 ? (
                                    recipe.instructions.map((instruction: string, index: number) => (
                                        <li key={index}>{instruction}</li>
                                    ))
                                ) : (
                                    <li>No instructions available</li>
                                )}
                            </ol>
                        </ScrollArea>
                    </div>
                    {recipe.nutritionalInfo && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Nutritional Information:</h3>
                            <ul className="list-disc list-inside">
                                <li>Calories: {recipe.nutritionalInfo.calories}</li>
                                <li>Protein: {recipe.nutritionalInfo.protein}</li>
                                <li>Carbs: {recipe.nutritionalInfo.carbs}</li>
                                <li>Fat: {recipe.nutritionalInfo.fat}</li>
                            </ul>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-gray-500">Enjoy your meal!</p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RecipePage;