const MainPageBody = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={`bg-slate-900/50 childFirst w-screen h-screen overflow-hidden`}>
      {children}
    </div>
  );
};
export default MainPageBody;