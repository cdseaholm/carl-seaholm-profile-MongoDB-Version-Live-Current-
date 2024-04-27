const MainChild = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="bg-white/30 rounded-md h-full w-full pb-8">
            {children}
        </div>
    );
};

export default MainChild;