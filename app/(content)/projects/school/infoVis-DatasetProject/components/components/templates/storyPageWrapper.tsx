export default function StoryPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-between items-center h-content w-full border rounded-md divide-y divide-gray-400/30">
            {children}
        </div>
    )
}