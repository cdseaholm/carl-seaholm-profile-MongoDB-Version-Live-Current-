'use client'

import { useStateStore } from "@/context/stateStore";

const MainChild = ({children}: {children: React.ReactNode}) => {

  const widthQuery = useStateStore((state) => state.widthQuery);

    return (
      <div className="flex flex-col bg-white/30 rounded-md flex-grow w-full h-full overflow-hidden">
        {children}
      </div>
    );
  };
export default MainChild;