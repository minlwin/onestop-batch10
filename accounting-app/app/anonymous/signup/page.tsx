"use client"

import FormGroup from "@/components/FormGroup";
import { useRouter } from "next/navigation";

export default function SignUpPage() {

    const router = useRouter()
    const gotoSignIn = () => router.push('/anonymous/signin')

    return (
        <>
            <h1 className="text-2xl mb-6">Sign Up</h1>

            <form>
                <FormGroup label="Name" bottom={3}>
                    <input type="text" className="form-control" placeholder="Enter User Name" />
                </FormGroup>
                <FormGroup label="Phone" bottom={3}>
                    <input type="tel" className="form-control" placeholder="Enter Phone Number" />
                </FormGroup>
                <FormGroup label="Email" bottom={3}>
                    <input type="email" className="form-control" placeholder="Enter Email" />
                </FormGroup>
                <FormGroup label="Password" bottom={3}>
                    <input type="password" className="form-control" placeholder="Enter Email" />
                </FormGroup>

                <div className="mt-4">
                    <button type="button" onClick={gotoSignIn} className="button secondary me-1">
                        Sign In
                    </button>
                    <button type="button" className="button primary">
                        Sign Up
                    </button>
                </div>
            </form>
        </>
    )
}