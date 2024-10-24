'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useRecipeStore from '@/lib/recipeStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileHeart, SaveAll } from 'lucide-react';

export default function RecipePage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const { recipe } = useRecipeStore();

    useEffect(() => {
        if (!recipe) {
            router.push('/');
        }
    }, [recipe, router]);

    if (!recipe) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{recipe.dishName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                        <ul className="list-disc pl-5">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                        <ol className="list-decimal pl-5">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="mb-2">{instruction}</li>
                            ))}
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium">Calories:</p>
                                <p>{recipe.nutritionalInfo.calories}</p>
                            </div>
                            <div>
                                <p className="font-medium">Protein:</p>
                                <p>{recipe.nutritionalInfo.protein}</p>
                            </div>
                            <div>
                                <p className="font-medium">Carbs:</p>
                                <p>{recipe.nutritionalInfo.carbs}</p>
                            </div>
                            <div>
                                <p className="font-medium">Fat:</p>
                                <p>{recipe.nutritionalInfo.fat}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => router.push('/')}>
                            Back to Camera
                        </Button>
                        {/* <Button>Add to CookBook <FileHeart /></Button> */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}