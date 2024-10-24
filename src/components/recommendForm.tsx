'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Camera, Loader2 } from 'lucide-react';
import { submitDishcoveryForm } from '@/actions/submitDishcoveryForm';

const DishcoveryForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isVeg, setIsVeg] = useState(true);
  const [servings, setServings] = useState(1);
  const [mealTime, setMealTime] = useState('snack');
  const [cuisineType, setCuisineType] = useState('any');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('none');
  const webcamRef = useRef<Webcam>(null);

  const initialState = { success: false, error: null, recipe: null };
  const [state, formAction] = useFormState(submitDishcoveryForm, initialState);

  React.useEffect(() => {
    if (state.success && state.recipe) {
      router.push(`/dish/${state.recipe.url}`);
    }
    setIsSubmitting(false);
  }, [state, router]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhotoPreview(imageSrc);
      setPhotoError(null);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!photoPreview) {
      setPhotoError('Please capture a photo before submitting.');
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.set('photoPreview', photoPreview);
    formAction(formData);
  };

  const handleReset = () => {
    setPhotoPreview(null);
    setPhotoError(null);
    setIsVeg(true);
    setServings(1);
    setMealTime('snack');
    setCuisineType('any');
    setDietaryRestrictions('none');
  };

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'environment'
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Dishcovery</CardTitle>
        <CardDescription className="text-center">
          Analyze your ingredients and get personalized recipe suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Camera Section */}
          <div className="space-y-2">
            <Label htmlFor="photo">Capture Ingredient Photo (required)</Label>
            <div className="relative w-full aspect-square mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              {photoPreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={photoPreview}
                    alt="Ingredient preview"
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setPhotoPreview(null)}
                  >
                    Retake
                  </Button>
                </div>
              ) : (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <Button
              type="button"
              onClick={capture}
              className="w-full"
              variant={photoPreview ? "outline" : "default"}
            >
              <Camera className="mr-2 h-4 w-4" />
              {photoPreview ? "Retake Photo" : "Capture Photo"}
            </Button>
            {photoError && (
              <p className="text-sm text-red-500 mt-1">{photoError}</p>
            )}
          </div>

          {/* Preferences Section */}
          <div className="space-y-4">
            {/* Vegetarian Switch and Servings */}
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isVegetarian"
                  name="isVegetarian"
                  checked={isVeg}
                  onCheckedChange={setIsVeg}
                />
                <Label htmlFor="isVegetarian">
                  {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="servings">Servings:</Label>
                <Input
                  type="number"
                  id="servings"
                  name="servings"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  min="1"
                  max="10"
                  className="w-20"
                />
              </div>
            </div>

            {/* Meal Time Select */}
            <div className="space-y-2">
              <Label htmlFor="mealTime">Meal Time</Label>
              <Select
                name="mealTime"
                value={mealTime}
                onValueChange={setMealTime}
              >
                <SelectTrigger id="mealTime">
                  <SelectValue placeholder="Select meal time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cuisine Type Select */}
            <div className="space-y-2">
              <Label htmlFor="cuisineType">Cuisine Type</Label>
              <Select
                name="cuisineType"
                value={cuisineType}
                onValueChange={setCuisineType}
              >
                <SelectTrigger id="cuisineType">
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="thai">Thai</SelectItem>
                  <SelectItem value="american">American</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dietary Restrictions Select */}
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
              <Select
                name="dietaryRestrictions"
                value={dietaryRestrictions}
                onValueChange={setDietaryRestrictions}
              >
                <SelectTrigger id="dietaryRestrictions">
                  <SelectValue placeholder="Select dietary restrictions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="gluten-free">Gluten-free</SelectItem>
                  <SelectItem value="dairy-free">Dairy-free</SelectItem>
                  <SelectItem value="nut-free">Nut-free</SelectItem>
                  <SelectItem value="low-carb">Low-carb</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Messages */}
          {state.error && (
            <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
              {state.error}
            </div>
          )}

          {/* Form Actions */}
          <CardFooter className="flex justify-between px-0 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Recipe...
                </>
              ) : (
                'Get Recipe'
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default DishcoveryForm;