import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Dishcovery";
const APP_DEFAULT_TITLE = "Dishcovery - Snap. Discover. Cook.";
const APP_TITLE_TEMPLATE = "%s | Dishcovery";
const APP_DESCRIPTION = "Transform your ingredients into amazing dishes with AI-powered recipe discovery";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",

  // Icons configuration
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // PWA configuration
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: [
      {
        url: '/icons/apple-splash-2048-2732.jpg',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-1668-2388.jpg',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/apple-splash-1290-2796.jpg',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },

  // Mobile configuration
  formatDetection: {
    telephone: false,
  },

  // Open Graph configuration
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: 'https://dishcovery.vercel.app',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Dishcovery - Snap. Discover. Cook.',
      }
    ],
  },

  // Twitter configuration
  twitter: {
    card: 'summary_large_image',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: ['/opengraph-image.png'],
    creator: '@yourtwitterhandle', // Optional: Add your Twitter handle
  },

  // Additional metadata
  keywords: [
    'recipe discovery',
    'AI recipes',
    'food recognition',
    'cooking app',
    'meal suggestions',
    'dish identification',
    'food AI',
    'cooking assistant'
  ],
  authors: [
    { name: 'Your Name' }
  ],
  creator: 'Your Name',
  publisher: 'Dishcovery',
  category: 'Food & Drink',
};

export const viewport: Viewport = {
  themeColor: "#4CAF50", // Changed to match your brand color
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-primary ${inter.className}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}