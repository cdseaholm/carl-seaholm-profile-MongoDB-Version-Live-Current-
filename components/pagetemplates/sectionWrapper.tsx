export default function SectionWrapper({ children, varHeight, extraProps }: { children: React.ReactNode, varHeight: string, extraProps: string }) {
    return (
        <section className={`w-full min-h-[500px] ${varHeight} ${extraProps}`}>
            {children}
        </section>
    )
}