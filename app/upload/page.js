import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Upload, X, Search } from 'lucide-react';
import Image from 'next/image';

const ImageUpload = () => {
	const [imagePreview, setImagePreview] = useState(null);
	const [recipe, setRecipe] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef(null);

	const handleImageUpload = (event) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		const formData = new FormData(event.target);

		try {
			const response = await fetch('/api/geminiapi', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Failed to submit form');
			}

			const result = await response.json();
			setRecipe(result);
		} catch (error) {
			console.error('Error submitting form:', error);
			// Handle error (e.g., show error message to user)
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4'>
			<div>
				<input
					type='file'
					accept='image/*'
					onChange={handleImageUpload}
					ref={fileInputRef}
					name='image'
					style={{ display: 'none' }}
				/>
				<Button
					type='button'
					onClick={() => fileInputRef.current.click()}>
					<Upload className='h-4 w-4 mr-2' /> Upload Image
				</Button>

				{imagePreview && (
					<div className='relative mt-4'>
						<Image
							src={imagePreview}
							alt='Preview'
							width={100}
							height={100}
							className='rounded-lg'
						/>
						<button
							type='button'
							onClick={() => setImagePreview(null)}
							className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1'>
							<X size={16} />
						</button>
					</div>
				)}
			</div>

			<Input
				name='dietaryRestrictions'
				placeholder='Dietary Restrictions'
			/>
			<Select name='isVegetarian'>
				<option value='yes'>Vegetarian</option>
				<option value='no'>Non-Vegetarian</option>
			</Select>
			<Input
				name='cuisineType'
				placeholder='Cuisine Type'
			/>
			<Select name='mealTime'>
				<option value='breakfast'>Breakfast</option>
				<option value='lunch'>Lunch</option>
				<option value='dinner'>Dinner</option>
			</Select>
			<Input
				name='servings'
				type='number'
				placeholder='Number of Servings'
			/>

			<Button
				type='submit'
				disabled={isLoading || !imagePreview}>
				<Search className='h-4 w-4 mr-2' />
				{isLoading ? 'Analyzing...' : 'Generate Recipe'}
			</Button>

			{recipe && (
				<div className='mt-4'>
					<h2 className='text-lg font-semibold'>{recipe.dishName}</h2>
					<h3 className='text-md font-semibold mt-2'>Ingredients:</h3>
					<ul className='list-disc list-inside'>
						{recipe.ingredients.map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
					<h3 className='text-md font-semibold mt-2'>Instructions:</h3>
					<ol className='list-decimal list-inside'>
						{recipe.instructions.map((step, index) => (
							<li key={index}>{step}</li>
						))}
					</ol>
					<h3 className='text-md font-semibold mt-2'>
						Nutritional Information:
					</h3>
					<p>Calories: {recipe.nutritionalInfo.calories}</p>
					<p>Protein: {recipe.nutritionalInfo.protein}</p>
					<p>Carbs: {recipe.nutritionalInfo.carbs}</p>
					<p>Fat: {recipe.nutritionalInfo.fat}</p>
				</div>
			)}
		</form>
	);
};

export default ImageUpload;
