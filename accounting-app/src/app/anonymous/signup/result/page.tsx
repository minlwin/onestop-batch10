'use client'

import { useSignUpResult } from "@/model/providers/signup-result.provider"
import { Button, Card } from "flowbite-react"
import Link from "next/link"

export default function SignUpResult() {
    const {message} = useSignUpResult()
    return (
        <>
            <h3 className="text-xl">Sign Up Result</h3>

            <Card className="my-4">
                <p>{message}</p>
            </Card>

            <Button>
                <Link href={`/anonymous/signin`}>Sign In</Link>
            </Button>
        </>
    )
}