'use client';

import { motion } from 'framer-motion';
import type { DrizzleRecipe } from '@/lib/db/schema';
import RecipeCard from './RecipeCard';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

interface ClientGalleryProps {
    recipes: DrizzleRecipe[];
}

export default function ClientGallery({ recipes }: ClientGalleryProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    DishGallery
                </h1>
                <p className="text-gray-600">
                    Explore our collection of amazing dishes
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.url} recipe={recipe} variants={item} />
                ))}
            </motion.div>

            {recipes.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 mt-12 py-16"
                >
                    <ChefHat className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-xl font-medium mb-2">No recipes found</p>
                    <p className="text-gray-400 mb-4">Let&apos;s create your first amazing recipe!</p>
                    <Link
                        href="/dishcover"
                        className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                        Create Recipe
                    </Link>
                </motion.div>
            )}
        </div>
    );
}