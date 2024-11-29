'use client';

import { useEffect, useState } from 'react';
import { fetchRecipe } from '@/actions/recipeUrl';
import { useToast } from '@/components/ui/use-toast';
import { RecipeContent } from '@/components/RecipeContent';
import { DrizzleRecipe } from '@/lib/db/schema';
import { notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';

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

    return <RecipeContent recipe={recipe} onCopyUrl={handleCopyUrl} />;
}