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

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // Remove startupImage as it's not a standard property in the Metadata type
  },

  formatDetection: {
    telephone: false,
  },

  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: 'https://dishcovery.vercel.app',
    // Remove images array as we're using the opengraph-image.tsx file
  },

  twitter: {
    card: 'summary_large_image',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    // Remove images array as we're using the twitter-image.tsx file
    creator: '@yourtwitterhandle',
  },

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
  themeColor: "#4CAF50",
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