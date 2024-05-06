import useMediaQuery from "@/components/listeners/WidthSettings";

const MainPageBody = ({children}: {children: React.ReactNode}) => {
    const isBreakpoint = useMediaQuery(768);
    const maxmin = isBreakpoint ? '87vh' : '82vh';

    return (
      <div className={`flex flex-col pb-8 childFirst`} style={{maxHeight: maxmin, minHeight: maxmin, overflow: 'hidden'}}>
        {children}
      </div>
    );
  };
  
  export default MainPageBody;