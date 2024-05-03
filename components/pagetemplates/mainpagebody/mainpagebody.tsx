const MainPageBody = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={`object-contain h-full w-full pb-8 childFirst`}>
            {children}
        </div>
    );
  };
  
  export default MainPageBody;