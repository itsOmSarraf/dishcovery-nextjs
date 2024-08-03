'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Camera } from "lucide-react";
import Image from 'next/image';

const DishcoveryForm: React.FC = () => {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isVeg, setIsVeg] = useState<boolean>(true);
    const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
    const cameraRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;

        const setupCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (cameraRef.current) {
                    cameraRef.current.srcObject = stream;
                    setIsCameraReady(true);
                }
            } catch (err) {
                console.error("Error accessing the camera:", err);
            }
        };

        setupCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = () => {
        if (cameraRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = cameraRef.current.videoWidth;
            canvas.height = cameraRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(cameraRef.current, 0, 0);
                setPhotoPreview(canvas.toDataURL('image/jpeg'));
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');
        // Form submission logic would go here
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-white">
            <CardHeader>
                <CardTitle className="text-xl">Dishcovery</CardTitle>
                <CardDescription>Analyze your vegetables and get recipe suggestions</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="photo">Capture Vegetable Photo</Label>
                        <div className="relative w-full h-48 sm:h-64 md:h-80 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                            {photoPreview ? (
                                <Image src={photoPreview} alt="Vegetable preview" layout="fill" objectFit="cover" />
                            ) : (
                                <>
                                    <video
                                        ref={cameraRef}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        playsInline
                                    />
                                    {isCameraReady && (
                                        <Button
                                            type="button"
                                            className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                                            onClick={handleCapture}
                                        >
                                            <Camera className="mr-2 h-4 w-4" /> Capture
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="veg-switch"
                            checked={isVeg}
                            onCheckedChange={setIsVeg}
                        />
                        <Label htmlFor="veg-switch">{isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</Label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="meal-type">Meal Type</Label>
                        <Select>
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
                        <Select>
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
                        <Select>
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
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Get Recipes</Button>
            </CardFooter>
        </Card>
    );
};

export default DishcoveryForm;