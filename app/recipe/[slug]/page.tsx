import React from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock function to fetch recipe data
async function getRecipeData(slug: string) {
    // In a real application, you would fetch this from your database
    // For now, we'll return mock data
    return {
        recipeName: "Vegetable Stir Fry",
        oneLiner: "A quick and healthy vegetarian dish",
        approxCookingTime: "30 mins",
        approxCalories: "300",
        serving: "4",
        ingredients: [
            { name: "Mixed Vegetables", quantity: "500g" },
            { name: "Soy Sauce", quantity: "2 tablespoons" },
        ],
        instructions: [
            { step: "Heat oil in a pan" },
            { step: "Add vegetables and stir fry for 5 minutes" },
            { step: "Add soy sauce and cook for another 2 minutes" },
        ],
        nonVeg: false,
        typeFood: "Asian",
        timeFood: "Dinner"
    };
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
    const recipeData = await getRecipeData(params.slug);

    if (!recipeData) {
        notFound();
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>{recipeData.recipeName}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg mb-4">{recipeData.oneLiner}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <strong>Cooking Time:</strong> {recipeData.approxCookingTime}
                    </div>
                    <div>
                        <strong>Calories:</strong> {recipeData.approxCalories}
                    </div>
                    <div>
                        <strong>Servings:</strong> {recipeData.serving}
                    </div>
                    <div>
                        <strong>Type:</strong> {recipeData.typeFood} {recipeData.timeFood}
                    </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside mb-4">
                    {recipeData.ingredients.map((ing, index) => (
                        <li key={index}>{ing.name}: {ing.quantity}</li>
                    ))}
                </ul>
                <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal list-inside">
                    {recipeData.instructions.map((inst, index) => (
                        <li key={index}>{inst.step}</li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
}