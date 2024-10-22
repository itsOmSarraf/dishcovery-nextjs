'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CameraIcon, GalleryVerticalEnd } from "lucide-react";
export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4">
        <Button onClick={() => router.push('/recommend')} variant="secondary"><CameraIcon />DishCover</Button>
        <Button onClick={() => router.push('/gallery')} variant={'secondary'} ><GalleryVerticalEnd /> DishGallery</Button>
      </div>
    </div>
  );
}