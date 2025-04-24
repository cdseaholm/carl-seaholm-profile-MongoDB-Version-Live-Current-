import FooterNavBar from "@/components/nav/footer/footerNavbar";

export default function InnerTemplate({children}: {
    children: React.ReactNode;}) {
    return (
        <section className="flex flex-col justify-between px-2 pb-2 bg-gray-500/70 overflow-auto scrollbar-thin scrollbar-webkit h-full py-4">
            <div>
                {children}
            </div>
            <FooterNavBar />
        </section>
    );
}