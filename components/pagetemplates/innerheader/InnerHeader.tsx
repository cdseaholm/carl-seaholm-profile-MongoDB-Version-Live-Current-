const InnerHeader = ({children}: {children: React.ReactNode;}) => {

    return (
        <div className="flex flex-row justify-between items-center w-full p-2 pb-5" style={{maxHeight: '8vh', minHeight: '8vh'}}>
            {children}
        </div>
    );
};

export default InnerHeader;