import axios from "axios";
import { SignUpForm, SignUpResult } from "../domains/anonymous.domain";
import { BASE_URL } from "../utils";

export async function memberSignUp(form : SignUpForm)  {
    return (await axios.post<SignUpResult>(`${BASE_URL}/security/signup`, form)).data
}