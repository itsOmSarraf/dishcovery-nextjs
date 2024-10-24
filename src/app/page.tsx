'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CameraIcon, GalleryVerticalEnd } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5
      }
    }
  };

  const buttonHover = {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex flex-col gap-8">
        <motion.div
          variants={item}
          className="text-center mb-4"
        >
          <h1 className="text-3xl font-semibold mb-2">Dishcovery</h1>
          <p className="text-gray-600 text-sm">Snap. Discover. Cook.</p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          variants={item}
        >
          <motion.div whileHover={buttonHover}>
            <Button
              onClick={() => router.push('/dishcover')}
              variant="secondary"
              className="w-[200px] h-[50px] gap-3"
            >
              <CameraIcon className="w-5 h-5" />
              DishCover
            </Button>
          </motion.div>

          <motion.div whileHover={buttonHover}>
            <Button
              onClick={() => router.push('/dishgallery')}
              variant="secondary"
              className="w-[200px] h-[50px] gap-3"
            >
              <GalleryVerticalEnd className="w-5 h-5" />
              DishGallery
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}