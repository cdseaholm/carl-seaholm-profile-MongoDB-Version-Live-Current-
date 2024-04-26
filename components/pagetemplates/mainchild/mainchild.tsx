const MainChild = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="bg-white/30 rounded-md h-full w-full" style={{ overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}}>
            {children}
        </div>
    );
};

export default MainChild;