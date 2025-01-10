import { createContext, useContext, useState } from "react"
import { ProviderParam } from "../types"

export default function ActiveMenuProvider({children} : ProviderParam) {
    const [activeMenu, setActiveMenu] = useState<string | undefined>()

    return (
        <ActiveMenuContext.Provider value={{activeMenu, setActiveMenu}}>
            {children}
        </ActiveMenuContext.Provider>
    )
}

type ActiveMenuContextType = {
    activeMenu?: string
    setActiveMenu(activeMenu?: string):void
}

const ActiveMenuContext = createContext<ActiveMenuContextType | undefined>(undefined)

export function useActiveMenu() {
    const context = useContext(ActiveMenuContext)

    if(!context) {
        throw new Error('Invalid Active Menu Context.')
    }

    return context
}