'use client'

import useMediaQuery from "@/components/listeners/WidthSettings";

const MainChild = ({children}: {children: React.ReactNode}) => {
    const isBreakpoint = useMediaQuery(768);
    const maxmin = isBreakpoint ? '87vh' : '82vh';

    return (
      <div className="flex flex-col bg-white/30 rounded-md pb-8" style={{maxHeight: maxmin, minHeight: maxmin, overflow: 'hidden'}}>
        {children}
      </div>
    );
  };
export default MainChild;