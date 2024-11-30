"use client"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

export function SignOut() {
    return <Button onClick={() => signOut()} className="w-full text-start text-sm">Sign Out</Button>
}