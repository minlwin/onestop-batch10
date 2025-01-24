import { LayoutParam } from "@/model/domains/types";
import { SignUpResultProvider } from "@/model/providers/signup-result.provider";

export default function Layout({children} : LayoutParam) {
    return (
        <SignUpResultProvider>
            {children}
        </SignUpResultProvider>
    )
}