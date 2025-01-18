import { LayoutParam } from "@/model/domains/types";
import { LedgerCodeProvider } from "@/model/providers/ledger-code.provider";

export default function Layout({children} : LayoutParam) {
    return (
        <LedgerCodeProvider>
            { children }
        </LedgerCodeProvider>
    )
}