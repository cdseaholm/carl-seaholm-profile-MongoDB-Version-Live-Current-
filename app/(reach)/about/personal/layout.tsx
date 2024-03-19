export const metadata = {
    title: "Personal",
    description: "A brief overview of Carl Seaholm's Personal Life"
};

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
        {children}
        </div>
    );
}