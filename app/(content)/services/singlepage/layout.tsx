

export const metadata = {
    title: "Service: Single Page work",
    description: "A Landing Page for a Single Page Service."
};

export default function SingleLayout({ children }: { children: React.ReactNode }) {
    return (

        <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
        {children}
        </div>
    );
}