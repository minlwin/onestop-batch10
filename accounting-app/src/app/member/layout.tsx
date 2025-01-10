import { LayoutParam } from "@/model/types";

export default function Layout({children}:LayoutParam) {
    return (
        <main>
            {children}
        </main>
    )
}