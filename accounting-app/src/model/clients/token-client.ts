import axios from "axios";
import { AccountInfo, RefreshForm, SignInForm } from "../domains/anonymous.domain";
import { BASE_URL } from "../utils";

export async function generateToken(form : SignInForm) {
    return (await axios.post<AccountInfo>(`${BASE_URL}/security/signin`, form)).data
}

export async function refreshToken(form : RefreshForm) {
    return (await axios.post<AccountInfo>(`${BASE_URL}/security/refresh`, form)).data
}