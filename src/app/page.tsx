'use client'
import SignIn from "@/components/auth/signin";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4">
        <Button onClick={() => router.push('/recommend')} variant="secondary">Recommend Me</Button>
        <Button onClick={() => router.push('/gallery')} variant={'outline'} >DishGallery</Button>
        <SignIn />
      </div>
    </div>
  );
}