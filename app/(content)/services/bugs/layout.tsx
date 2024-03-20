

export const metadata = {
    title: "Service: Debugging and Bug Fixing",
    description: "A Landing Page for Debugging and Bug Fixing Services."
};

export default function BugsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
        {children}
        </div>
    );
}