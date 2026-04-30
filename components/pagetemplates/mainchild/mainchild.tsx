'use client'

import NavBar from "@/components/nav/Navbar";

const MainChild = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex flex-col justify-start items-center bg-white/30 w-screen h-dvh overflow-hidden">
      <NavBar />
      {children}
    </div>
  );
};

export default MainChild;