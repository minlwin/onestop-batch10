import { BalanceTypeProvider } from "@/model/providers/balance-type.provider";
import { LayoutParam } from "@/model/domains/types";

export default function Layout({children}:LayoutParam) {
    return (
        <BalanceTypeProvider>
            {children}
        </BalanceTypeProvider>
    )
}