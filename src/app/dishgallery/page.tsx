import { fetchRecipes } from '@/actions/fetchDishes';
import ClientGallery from '../../components/DishGallery';
import { Suspense } from 'react';

export const metadata = {
    title: 'DishGallery',
}
export default async function DishGalleryPage() {
    const result = await fetchRecipes();
    const recipes = result.success ? result.data : [];

    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            </div>
        }>
            <ClientGallery recipes={recipes} />
        </Suspense>
    );
}