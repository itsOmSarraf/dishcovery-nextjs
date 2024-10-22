"use client"
import { signIn } from "next-auth/react"
import { Button } from "../ui/button"

export default function SignIn() {
    return <Button variant={'secondary'} onClick={() => signIn()}>Sign In</Button>
}