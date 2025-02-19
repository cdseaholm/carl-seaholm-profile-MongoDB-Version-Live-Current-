import MainChild from "@/components/pagetemplates/mainchild/mainchild";

export default function NPWebApps({ webapps, webDropdown }: { webapps: { name: string, description: string }[], webDropdown: boolean }) {
    return (
        <MainChild>
            <div className="p-2">
                <div className="flex justify-center pb-10 p-2">
                    <h1 className="text-2xl">New Progress Web Applications</h1>
                </div>
                <div className='flex flex-col justify-center items-start'>
                {webDropdown && webapps.map((app, index) => (
                    <div key={index}>
                        <li>{app.name}</li>
                        <p className="pl-10 pb-10">{app.description}</p>
                    </div>   
                ))}
                </div>
            </div>
        </MainChild>
    )
}