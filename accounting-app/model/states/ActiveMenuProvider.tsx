import { createContext, useContext, useState } from "react"

export default function ActiveMenuProvider({children}: {children: Readonly<React.ReactNode>}) {
    
    const [activeMenu, setActiveMenu] = useState<string | undefined>()
    
    return (
        <ActiveMenuContext.Provider value={{activeMenu, setActiveMenu}}>
            {children}
        </ActiveMenuContext.Provider>
    )
}

export interface ActiveMenuContextType {
    activeMenu?:string
    setActiveMenu(activeMenu?:string):void
}

const ActiveMenuContext = createContext<ActiveMenuContextType | undefined>(undefined)

export const useActiveMenu = () => {
    const context = useContext(ActiveMenuContext)

    if(!context) {
        throw new Error('Invalid active menu context.')
    }

    return context
}