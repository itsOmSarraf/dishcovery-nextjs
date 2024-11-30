// components/auth/signin.tsx
"use client"
import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function SignIn() {
    const router = useRouter()

    const handleSignIn = async () => {
        try {
            await signIn("google", {
                callbackUrl: '/dishcover',
                redirect: true
            })
        } catch (error) {
            console.error("Sign in error:", error)
        }
    }

    return (
        <div>
            <Button
                variant="secondary"
                onClick={handleSignIn}
                className="hover:scale-105 transition-transform duration-200"
            >
                Sign In
            </Button>
        </div>
    )
}