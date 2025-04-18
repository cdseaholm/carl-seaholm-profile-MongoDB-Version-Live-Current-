import FooterNavBar from "@/components/nav/footer/footerNavbar";

export default function InnerTemplate({children}: {
    children: React.ReactNode;}) {
    return (
        <section className="flex flex-col justify-between px-2 pb-2 bg-gray-500/70 rounded-md overflow-auto scrollbar-thin scrollbar-webkit h-full">
            <div>
                {children}
            </div>
            <FooterNavBar />
        </section>
    );
}