'use client'
import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Camera } from "lucide-react";
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { submitDishcoveryForm } from '@/app/actions/submitDishcoveryForm';

const DishcoveryForm: React.FC = () => {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isVeg, setIsVeg] = useState<boolean>(true);
    const [mealType, setMealType] = useState<string>('');
    const [cuisineType, setCuisineType] = useState<string>('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState<string>('none');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const initialState = { message: '', error: undefined };
    const [state, formAction] = useFormState(submitDishcoveryForm, initialState);

    const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.1,
                    maxWidthOrHeight: 1200,
                    useWebWorker: true,
                    quality: 0.6
                };
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhotoPreview(reader.result as string);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Error compressing image:', error);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-white">
            <CardHeader>
                <CardTitle className="text-xl">Dishcovery</CardTitle>
                <CardDescription>Analyze your vegetables and get recipe suggestions</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="photo">Capture Vegetable Photo</Label>
                        <div className="relative w-full h-48 sm:h-64 md:h-80 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                            {photoPreview ? (
                                <Image src={photoPreview} alt="Vegetable preview" layout="fill" objectFit="cover" />
                            ) : (
                                <Button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="absolute"
                                >
                                    <Camera className="mr-2 h-4 w-4" /> Capture
                                </Button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                capture="environment"
                                onChange={handleCapture}
                                className="hidden"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="veg-switch"
                            name="isVegetarian"
                            checked={isVeg}
                            onCheckedChange={setIsVeg}
                        />
                        <Label htmlFor="veg-switch">{isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</Label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="meal-type">Meal Type</Label>
                        <Select name="mealType" required onValueChange={(value) => setMealType(value)}>
                            <SelectTrigger id="meal-type">
                                <SelectValue placeholder="Select meal type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="breakfast">Breakfast</SelectItem>
                                <SelectItem value="lunch">Lunch</SelectItem>
                                <SelectItem value="dinner">Dinner</SelectItem>
                                <SelectItem value="snack">Snack</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cuisine-type">Cuisine Preference</Label>
                        <Select name="cuisineType" required onValueChange={(value) => setCuisineType(value)}>
                            <SelectTrigger id="cuisine-type">
                                <SelectValue placeholder="Select cuisine type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="italian">Italian</SelectItem>
                                <SelectItem value="indian">Indian</SelectItem>
                                <SelectItem value="chinese">Chinese</SelectItem>
                                <SelectItem value="mexican">Mexican</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
                        <Select name="dietaryRestrictions" required value={dietaryRestrictions} onValueChange={(value) => setDietaryRestrictions(value)}>
                            <SelectTrigger id="dietary-restrictions">
                                <SelectValue placeholder="Select dietary restrictions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="gluten-free">Gluten-free</SelectItem>
                                <SelectItem value="dairy-free">Dairy-free</SelectItem>
                                <SelectItem value="nut-free">Nut-free</SelectItem>
                                <SelectItem value="low-carb">Low-carb</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {state.message && <p className="text-green-600">{state.message}</p>}
                    {state.error && <p className="text-red-600">{state.error}</p>}

                    <input type="hidden" name="photoPreview" value={photoPreview || ''} />

                    <CardFooter className="flex justify-between px-0">
                        <Button type="button" variant="outline" onClick={() => window.location.reload()}>Cancel</Button>
                        <Button type="submit">Get Recipes</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export default DishcoveryForm;