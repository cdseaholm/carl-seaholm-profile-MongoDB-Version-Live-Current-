const MainPageBody = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={`flex flex-col h-full w-full childFirst`} style={{overflow: 'auto'}}>
            {children}
        </div>
    );
  };
  
  export default MainPageBody;