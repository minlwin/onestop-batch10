import { LayoutParam } from "@/model/domains/types";
import { MemberIdProvider } from "@/model/providers/member-id.provider";

export default function Layout({children} : LayoutParam) {
    return (
        <MemberIdProvider>
            {children}
        </MemberIdProvider>
    )
}