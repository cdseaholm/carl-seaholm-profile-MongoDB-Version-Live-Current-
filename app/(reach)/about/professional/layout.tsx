export const metadata = {
    title: "About",
    description: "A brief overview of Carl Seaholm's Professional Life"
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
        {children}
        </div>
    );
}