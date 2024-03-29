

const MainChild = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="bg-white/30 rounded-md" style={{ minHeight: '71vh', maxHeight: '71vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}}>
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};

export default MainChild;