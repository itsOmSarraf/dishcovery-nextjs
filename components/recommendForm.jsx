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
import { Camera } from 'lucide-react';
import { submitDishcoveryForm } from '@/app/actions/submitDishcoveryForm';
import useRecipeStore from '@/lib/recipeStore';

const DishcoveryForm = () => {
	const { setRecipe } = useRecipeStore();
	const router = useRouter();
	const [photoPreview, setPhotoPreview] = useState(null);
	const [photoError, setPhotoError] = useState(null);
	const [isVeg, setIsVeg] = useState(true);
	const [servings, setServings] = useState(1);
	const [mealTime, setMealTime] = useState('snack');
	const [cuisineType, setCuisineType] = useState('any');
	const [dietaryRestrictions, setDietaryRestrictions] = useState('none');
	const webcamRef = useRef(null);

	const initialState = { success: false, error: null, recipe: null };
	const [state, formAction] = useFormState(submitDishcoveryForm, initialState);

	React.useEffect(() => {
		if (state.success && state.recipe) {
			setRecipe(state.recipe);
			router.push('/recipe');
		}
	}, [state, setRecipe, router]);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setPhotoPreview(imageSrc);
		setPhotoError(null);
	}, [webcamRef]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!photoPreview) {
			setPhotoError('Please capture a photo before submitting.');
			return;
		}
		const formData = new FormData(event.currentTarget);
		formData.set('photoPreview', photoPreview);
		formAction(formData);
	};

	const videoConstraints = {
		width: 640,
		height: 480,
		facingMode: 'environment'
	};

	return (
		<Card className='w-full max-w-md mx-auto bg-white'>
			<CardHeader>
				<CardTitle className='text-xl'>Dishcovery</CardTitle>
				<CardDescription>
					Analyze your vegetables and get recipe suggestions
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					{/* Webcam capture section */}
					<div className='space-y-2'>
						<Label htmlFor='photo'>Capture Vegetable Photo (required)</Label>
						<div className='relative w-64 h-64 mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden'>
							{photoPreview ? (
								<Image
									src={photoPreview}
									alt='Vegetable preview'
									layout='fill'
									objectFit='cover'
								/>
							) : (
								<Webcam
									audio={false}
									ref={webcamRef}
									screenshotFormat='image/jpeg'
									videoConstraints={videoConstraints}
								/>
							)}
						</div>
						<Button
							type='button'
							onClick={capture}
							className='w-full'>
							<Camera className='mr-2 h-4 w-4' /> Capture Photo
						</Button>
						{photoError && (
							<p className='text-red-500 text-sm mt-1'>{photoError}</p>
						)}
					</div>

					{/* Vegetarian switch and servings input */}
					<div className='flex items-center space-x-4'>
						<div className='flex items-center space-x-2'>
							<Switch
								id='veg-switch'
								name='isVegetarian'
								checked={isVeg}
								onCheckedChange={setIsVeg}
							/>
							<Label htmlFor='veg-switch'>
								{isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<Label htmlFor='servings'>Servings:</Label>
							<Input
								type='number'
								id='servings'
								name='servings'
								value={servings}
								onChange={(e) => setServings(Number(e.target.value))}
								min='1'
								max='10'
								className='w-16'
							/>
						</div>
					</div>

					{/* Meal Type select */}
					<div className='space-y-2'>
						<Label htmlFor='meal-time'>Meal Type</Label>
						<Select
							name='mealTime'
							value={mealTime}
							onValueChange={setMealTime}>
							<SelectTrigger id='meal-time'>
								<SelectValue placeholder='Select meal type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='breakfast'>Breakfast</SelectItem>
								<SelectItem value='lunch'>Lunch</SelectItem>
								<SelectItem value='dinner'>Dinner</SelectItem>
								<SelectItem value='snack'>Snack</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Cuisine Preference select */}
					<div className='space-y-2'>
						<Label htmlFor='cuisine-type'>Cuisine Preference</Label>
						<Select
							name='cuisineType'
							value={cuisineType}
							onValueChange={setCuisineType}>
							<SelectTrigger id='cuisine-type'>
								<SelectValue placeholder='Select cuisine type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='any'>Any</SelectItem>
								<SelectItem value='italian'>Italian</SelectItem>
								<SelectItem value='indian'>Indian</SelectItem>
								<SelectItem value='chinese'>Chinese</SelectItem>
								<SelectItem value='mexican'>Mexican</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Dietary Restrictions select */}
					<div className='space-y-2'>
						<Label htmlFor='dietary-restrictions'>Dietary Restrictions</Label>
						<Select
							name='dietaryRestrictions'
							value={dietaryRestrictions}
							onValueChange={setDietaryRestrictions}>
							<SelectTrigger id='dietary-restrictions'>
								<SelectValue placeholder='Select dietary restrictions' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='none'>None</SelectItem>
								<SelectItem value='gluten-free'>Gluten-free</SelectItem>
								<SelectItem value='dairy-free'>Dairy-free</SelectItem>
								<SelectItem value='nut-free'>Nut-free</SelectItem>
								<SelectItem value='low-carb'>Low-carb</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{state.error && <p className='text-red-600'>{state.error}</p>}
					{photoError && <p className='text-red-600'>{photoError}</p>}

					<CardFooter className='flex justify-between px-0'>
						<Button
							type='button'
							variant='outline'
							onClick={() => window.location.reload()}>
							Cancel
						</Button>
						<Button type='submit'>Get Recipes</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	);
};

export default DishcoveryForm;
