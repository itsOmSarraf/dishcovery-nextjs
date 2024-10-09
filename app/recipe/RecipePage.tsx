'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from 'next/navigation';
import { Utensils, Clock, Users, ArrowLeft } from 'lucide-react';

const RecipePage: React.FC = () => {
    const [recipe, setRecipe] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedRecipe = localStorage.getItem('generatedRecipe');
        if (storedRecipe) {
            try {
                setRecipe(JSON.parse(storedRecipe));
            } catch (error) {
                console.error('Failed to parse recipe:', error);
            }
        }
    }, []);

    if (!recipe) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-md">
                    <CardContent className="flex items-center justify-center h-32">
                        <p className="text-lg font-medium">Loading recipe...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{recipe.dishName}</CardTitle>
                    <div className="flex space-x-4 mt-2">
                        <Badge variant="secondary" className="flex items-center">
                            <Utensils className="mr-1 h-4 w-4" />
                            {recipe.cuisineType}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {recipe.mealTime}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            {recipe.servings} servings
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
                            <ScrollArea className="h-48 rounded-md border p-4">
                                <ul className="space-y-2">
                                    {recipe.ingredients.map((ingredient: string, index: number) => (
                                        <li key={index} className="flex items-center">
                                            <span className="mr-2">•</span>
                                            {ingredient}
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Nutritional Information:</h3>
                            <Card>
                                <CardContent className="p-4">
                                    <ul className="space-y-2">
                                        <li>Calories: {recipe.nutritionalInfo.calories}</li>
                                        <li>Protein: {recipe.nutritionalInfo.protein}</li>
                                        <li>Carbs: {recipe.nutritionalInfo.carbs}</li>
                                        <li>Fat: {recipe.nutritionalInfo.fat}</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
                    <ScrollArea className="h-64 rounded-md border p-4">
                        <ol className="space-y-4">
                            {recipe.instructions.map((step: string, index: number) => (
                                <li key={index} className="flex">
                                    <span className="font-bold mr-2">{index + 1}.</span>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.push('/')} className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dishcovery
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RecipePage;