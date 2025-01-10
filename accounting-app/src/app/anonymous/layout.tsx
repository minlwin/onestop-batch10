import PageTitle from "@/components/PageTitle";

export default function Layout({children}:{children:React.ReactNode}) {
    return (
        <main className="p-6">
            
            <PageTitle title="My Balance" />

            <section className="flex mt-4">

                <div className="w-3/4">
                    <img src="/cover-image.jpg" alt="" />
                </div>

                <div className="p-4 w-1/4">
                    {children}
                </div>
            </section>
        </main>
    )
}