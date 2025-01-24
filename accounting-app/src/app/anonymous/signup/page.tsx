'use client'

import FormGroup from "@/components/form-group";
import SubTitle from "@/components/sub-title";
import { memberSignUp } from "@/model/clients/signup-client";
import { SignUpForm } from "@/model/domains/anonymous.domain";
import { useSignUpResult } from "@/model/providers/signup-result.provider";
import { Button, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page() {

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpForm>()
    const {setMessage} = useSignUpResult()
    const router = useRouter()

    const signUp = async (form:SignUpForm) => {
        const resp = await memberSignUp(form)

        setMessage(
            `Hello ${resp.name}!
            Admin will active your account soon. Please wait some moment.
            Thank you for your registration.`)

        router.push('/anonymous/signup/result')
    }

    return (
        <form onSubmit={handleSubmit(signUp)}>
            <SubTitle title="Sign Up" />

            <FormGroup className="my-3" label="Name">
                <TextInput type="text" placeholder="Enter Member Name" {...register('name', {
                    required: "Please enter member name."
                })} />
                {errors.name && <span className="error">{errors.name.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Phone">
                <TextInput type="tel" placeholder="Enter Phone Number" {...register('phone', {
                    required: "Please enter phone number."
                })} />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Email">
                <TextInput type="email" placeholder="Enter Email Address" {...register('email', {
                    required: "Please enter email for login."
                })} />
                {errors.email && <span className="error">{errors.email.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Password">
                <TextInput type="password" placeholder="Enter Password" {...register('password', {
                    required: "Please enter password.",
                    minLength: {
                        value: 4,
                        message: "Password must be greater than 4 digit."
                    },
                    maxLength: {
                        value: 8,
                        message: "Password must be less than 8 digit."
                    }
                })} />
                {errors.email && <span className="error">{errors.email.message}</span>}
            </FormGroup>
            
            <div className="flex gap-2">
                <Button color="teal">
                    <Link href={'signin'}>Sign In</Link>
                </Button>
                <Button type="submit">Sign Up</Button>
            </div>
        </form>
    )
}