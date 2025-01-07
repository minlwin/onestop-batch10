"use client"

import ErrorAlert from "@/components/ErrorAlert";
import FormGroup from "@/components/FormGroup";
import { useRouter } from "next/navigation";
import { useState } from "react";

import axios from 'axios';
import { useLoginUser } from "@/model/states/LoginUserState";

export default function SignInPage() {

    const router = useRouter()
    const gotoSignUp = () => router.push('/anonymous/signup')

    const [model, setModel] = useState<SingInModel>({email: "", password : ""})
    const setEmail = (text:string) => setModel(prev => ({...prev, email: text}))
    const setPassword = (text:string) => setModel(prev => ({...prev, password: text}))

    const [error, setError] = useState<string>('')
    const {setUser} = useLoginUser()

    const signIn = async (e:React.FormEvent) => {

        e.preventDefault()

        // Validation
        if(model.email === '') {
            setError('Please enter email for sign in.')
            return
        }

        if(model.password === '') {
            setError('Please enter password.')
            return
        }
        
        // Call Sign In API
        const result = await axios.post('http://localhost:8080/security/signin', model)
        console.log(result.data)

        setUser(result.data)

        router.push('/')
    }

    return (
        <>
            <h1 className="text-2xl mb-6">Sign In</h1>

            {error ?? <ErrorAlert message={error}></ErrorAlert>}

            <form onSubmit={signIn}>
                <FormGroup label="Email" bottom={3}>
                    <input value={model.email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Email" />
                </FormGroup>
                <FormGroup label="Password" bottom={3}>
                    <input value={model.password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Email" />
                </FormGroup>

                <div className="mt-4">
                    <button type="button" onClick={gotoSignUp} className="button secondary me-1">
                        Sign Up
                    </button>
                    <button type="submit" className="button primary">
                        Sign In
                    </button>
                </div>
            </form>
        </>
    )
}

interface SingInModel {
    email:string
    password:string
}