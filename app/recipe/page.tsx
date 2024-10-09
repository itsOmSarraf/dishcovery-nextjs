import { cookies } from 'next/headers';
import RecipePage from './RecipePage';

export default function RecipePageWrapper() {
    const cookieStore = cookies();
    const recipeCookie = cookieStore.get('generatedRecipe');

    let recipeData = null;
    if (recipeCookie) {
        try {
            recipeData = JSON.parse(recipeCookie.value);
        } catch (error) {
            console.error('Failed to parse recipe cookie:', error);
        }
    }

    const safeRecipeData = JSON.stringify(recipeData)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');

    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.localStorage.setItem('generatedRecipe', '${safeRecipeData}');`,
                }}
            />
            <RecipePage />
        </>
    );
}