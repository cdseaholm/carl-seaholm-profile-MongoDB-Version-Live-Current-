'use client'

import NavBar from "@/components/nav/Navbar";

const MainChild = ({ children }: { children: React.ReactNode }) => {

  return (
      <div className="flex flex-col bg-white/30 w-full h-full overflow-hidden px-2 pb-2">
        <NavBar />
          {children}
      </div>
  );
};

export default MainChild;