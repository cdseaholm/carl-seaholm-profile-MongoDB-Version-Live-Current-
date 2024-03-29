

const MainPageBody = ({children}: {children: React.ReactNode}) => {

    return (
        <div className={`childFirst my-4 py-2 mx-8 px-2`}  style={{ minHeight: '82vh', maxHeight: '82vh'}}>
            <div style={{minHeight: '70hv', maxHeight: '70vh'}}>
                {children}
            </div>
        </div>
    );
};

export default MainPageBody;