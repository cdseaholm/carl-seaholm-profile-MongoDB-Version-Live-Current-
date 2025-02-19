export function Spinner() {
    return (
        <div className="flex flex-row rounded-full animate-pulse h-full w-full justify-center items-center p-2">
            <p className="font-semibold text-md md:text-lg text-left text-slate-700">
                {`Loading...`}
            </p>
        </div>
    );
}