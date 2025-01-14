import { LedgerEntryIdProvider } from "@/model/providers/ledger-entry-id.provider";
import { LayoutParam } from "@/model/types";

export default function Layout({children}:LayoutParam) {
    return (
        <LedgerEntryIdProvider>
            {children}
        </LedgerEntryIdProvider>
    )
}