'use client'

import { useSignUpResult } from "@/model/providers/signup-result.provider"

export default function SignUpResult() {
    const {message} = useSignUpResult()
    return (
        <>
            <h3>Sign Up Result</h3>

            <p>{message}</p>
        </>
    )
}