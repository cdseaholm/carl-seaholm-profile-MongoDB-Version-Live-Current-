

export const metadata = {
    title: "Writing Projects",
    description: "A One Sheet for Writing Projects."
};

export default function WritingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
        {children}
        </div>
    );
}