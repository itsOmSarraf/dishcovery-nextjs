'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const RecipePage: React.FC = () => {
    const [recipe, setRecipe] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedRecipe = localStorage.getItem('generatedRecipe');
        if (storedRecipe) {
            setRecipe(JSON.parse(storedRecipe));
        }
    }, []);

    if (!recipe) {
        return <div>Loading recipe...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{recipe.dishName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Ingredients:</h3>
                    <ul className="list-disc pl-5 mb-4">
                        {recipe.ingredients.map((ingredient: string, index: number) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Instructions:</h3>
                    <ol className="list-decimal pl-5 mb-4">
                        {recipe.instructions.map((step: string, index: number) => (
                            <li key={index} className="mb-2">{step}</li>
                        ))}
                    </ol>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Nutritional Information:</h3>
                    <ul className="list-none pl-5">
                        <li>Calories: {recipe.nutritionalInfo.calories}</li>
                        <li>Protein: {recipe.nutritionalInfo.protein}</li>
                        <li>Carbs: {recipe.nutritionalInfo.carbs}</li>
                        <li>Fat: {recipe.nutritionalInfo.fat}</li>
                    </ul>

                    <Button className="mt-6" onClick={() => router.push('/')}>
                        Back to Dishcovery
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default RecipePage;