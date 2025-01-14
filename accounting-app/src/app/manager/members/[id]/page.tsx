import InfoItem from "@/components/info-item";
import PageTitle from "@/components/page-title";
import SubTitle from "@/components/sub-title";

export default function Page() {
    return (
        <>
            <PageTitle title="Member Details" />
            
            <div className="flex mt-4">
                <Profile className="w-1/5" />
                <AccessHistory className="w-3/5" />
                <PersonalInfo className="w-1/5" />
            </div>
        </>
    )
}

function Profile({className}: {className?:string}) {
    return (
        <section className={className}>

            <SubTitle title="Profile" />
            {/* Profile Image */}
            <div className="mt-4 me-8 profile">
                <img src="/profile.png" alt="" />
                <button className="w-full mt-4">De Activate</button>
            </div>

        </section>
    )
}

function PersonalInfo({className}: {className?:string}) {
    return (
        <section className={className}>

            <SubTitle title="Information" />

            <div className="pt-4">
               <InfoItem label="Name" value="Aung Aung" />
               <InfoItem label="Phone" value="0918171717" />
               <InfoItem label="Email" value="aung@gmail.com" />
               <InfoItem label="Status" value="Activated" />
               <InfoItem label="Registered At" value="2025-01-10 10:00" />
               <InfoItem label="Activated At" value="2025-01-12 10:00" />
            </div>
        </section>
    )
}

function AccessHistory({className}: {className?:string}) {
    return (
        <section className={`${className} me-8`}>
            <SubTitle title="Access History" />

            <table className="mt-4">
                <thead>
                    <tr>
                        <th>Access At</th>
                        <th>Activity</th>
                        <th>Status</th>
                        <th>Exception</th>
                    </tr>
                </thead>

                <tbody>
                    {[1,2,3].map(item => 
                        <tr key={item}>
                            <td>2025-01-10 10:00</td>
                            <td>Sign Up</td>
                            <td>Success</td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}