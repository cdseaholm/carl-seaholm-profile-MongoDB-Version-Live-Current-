import ContinuePrompt from "../../story/components/extras/continuePrompt";


export default function TextWrapper({ children, page }: { children: React.ReactNode, page: number }) {
    return (
        <div className={`flex flex-col h-content w-full px-6 pt-12 space-y-12 ${page === 1 ? 'rounded-md' : 'rounded-t-md'} text-center bg-slate-200/50`}>
            {children}
            {page !== 6 && <ContinuePrompt scrollPrompt={page === 1 ? true : false} />}
        </div>
    )
}