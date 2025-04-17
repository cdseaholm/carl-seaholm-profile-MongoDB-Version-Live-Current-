export default function ModalTemplate({ children, subtitle, minWidth, minHeight }: { children: React.ReactNode, subtitle: string | null, minWidth: string, minHeight: string }) {
    return (
        <main style={{ minWidth: minWidth, minHeight: minHeight }} className="flex flex-col justify-evenly items-center">
            {subtitle ? (
                <section className="w-full text-center">
                    {subtitle}
                </section>
            ) : (
                null
            )}
            <div className="w-full h-full" style={{overflow: 'hidden'}}>
                {children}
            </div>
        </main>
    )
}