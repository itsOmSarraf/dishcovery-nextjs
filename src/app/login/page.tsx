import SignIn from '@/components/auth/signin'
import React from 'react'
import { ChefHat, UtensilsCrossed } from 'lucide-react'

export default function Page() {
    return (
        <div className="flex min-h-[80vh] flex-col justify-center items-center bg-gradient-to-b from-white to-orange-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-8 relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-orange-500 rounded-full p-4 shadow-lg">
                    <ChefHat className="w-8 h-8 text-white" />
                </div>

                <div className="text-center space-y-4 pt-4">
                    <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        Dishcovery
                        <UtensilsCrossed className="w-8 h-8 text-orange-500" />
                    </h1>

                    <p className="text-gray-600 text-lg">
                        find the dish hidden in your fridge
                    </p>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                <SignIn />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}