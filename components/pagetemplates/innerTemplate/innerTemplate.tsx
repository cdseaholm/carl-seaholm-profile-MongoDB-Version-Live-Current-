//import FooterNavBar from "@/components/nav/footer/footerNavbar";

export default function InnerTemplate({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col justify-start items-center w-full h-dvh overflow-hidden p-1">
            <section className="flex flex-col justify-between px-2 pb-2 bg-gray-500/70 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-webkit h-full w-full py-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.10),inset_0_-2px_8px_rgba(0,0,0,0.10)] rounded-md">
                {children}
            </section>
        </div>
    );
}

//<FooterNavBar />