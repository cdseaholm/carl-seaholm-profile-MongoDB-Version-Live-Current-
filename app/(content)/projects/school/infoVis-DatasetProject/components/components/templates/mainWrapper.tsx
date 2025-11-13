export default function MainWrapper({ children, landing }: { children: React.ReactNode, landing: boolean }) {
    return (
        <main className={`flex h-screen flex-col items-center justify-start w-screen overflow-hidden px-8 ${landing ? 'pt-24' : ''}`}>
            {children}
        </main>
    )
}