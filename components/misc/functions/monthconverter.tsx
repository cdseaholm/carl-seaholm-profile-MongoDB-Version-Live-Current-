export default function MonthConverter({month}: {month: number}) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return (
        <div className="flex flex-row w-full text-xs md:text-sm justify-center items-center">
            <p>{monthNames[month - 1]}</p>
        </div>
    );
}