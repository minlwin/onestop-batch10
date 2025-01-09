import { LoginUserProvider } from "./LoginUserState";

export default function AppProvider({children} : {children: Readonly<React.ReactNode>}) {
    return <LoginUserProvider>
            {children}
    </LoginUserProvider>
}