'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Search } from 'lucide-react';

const Gemini = async (imageBase64, mimeType, prompt) => {
	try {
		const response = await fetch('/api/geminiapi', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ imageBase64, mimeType, prompt })
		});
		const result = await response.json();
		console.log('Gemini API result:', result);
		return result;
	} catch (error) {
		console.error('Error calling Gemini API:', error);
		return null;
	}
};

const ImageUpload = () => {
	const [imagePreview, setImagePreview] = useState(null);
	const [imageBase64, setImageBase64] = useState(null);
	const [mimeType, setMimeType] = useState(null);
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef(null);

	const handleImageUpload = useCallback((event) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];

			// Convert image to base64 and create preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				const base64String = reader.result.split(',')[1];
				setImageBase64(base64String);
				setMimeType(file.type);
				setDescription(''); // Clear previous description
			};
			reader.readAsDataURL(file);
		}
	}, []);

	const analyzeImage = useCallback(async () => {
		if (!imageBase64 || !mimeType) return;

		setIsLoading(true);
		const prompt = 'What is in this image? Describe it in detail.';
		const result = await Gemini(imageBase64, mimeType, prompt);
		setIsLoading(false);

		if (result && result.description) {
			setDescription(result.description);
		} else if (result && typeof result === 'string') {
			setDescription(result);
		} else {
			setDescription("Sorry, I couldn't analyze the image. Please try again.");
		}
	}, [imageBase64, mimeType]);

	const removeImage = useCallback(() => {
		setImagePreview(null);
		setImageBase64(null);
		setMimeType(null);
		setDescription('');
	}, []);

	return (
		<div className='flex flex-col items-center'>
			<input
				type='file'
				accept='image/*'
				onChange={handleImageUpload}
				ref={fileInputRef}
				style={{ display: 'none' }}
			/>
			<Button onClick={() => fileInputRef.current.click()}>
				<Upload className='h-4 w-4 mr-2' /> Upload Image
			</Button>

			{imagePreview && (
				<div className='relative mt-4'>
					<img
						src={imagePreview}
						alt='Preview'
						className='max-w-[100px] h-auto rounded-lg'
					/>
					<button
						onClick={removeImage}
						className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1'>
						<X size={16} />
					</button>
				</div>
			)}

			{imageBase64 && !description && (
				<Button
					onClick={analyzeImage}
					className='mt-4'
					disabled={isLoading}>
					<Search className='h-4 w-4 mr-2' />
					{isLoading ? 'Analyzing...' : "What's in this image?"}
				</Button>
			)}

			{description && (
				<div className='mt-4 w-full max-w-md'>
					<h2 className='text-lg font-semibold'>Image Analysis:</h2>
					<p className='mt-2 p-4 bg-gray-100 rounded'>{description}</p>
				</div>
			)}
		</div>
	);
};

export default function Page() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4'>
			<h1 className='text-2xl font-bold mb-6'>Image Upload and Analysis</h1>
			<ImageUpload />
		</div>
	);
}
