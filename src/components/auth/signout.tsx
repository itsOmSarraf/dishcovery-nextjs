"use client"
import { signOut } from "next-auth/react"

export function SignOut() {
    return <button onClick={() => signOut()} className="w-full text-start text-sm">Sign Out</button>
}