const MainPageBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-900/50 w-full h-dvh overflow-y-auto scrollbar-thin scrollbar-webkit">
      {children}
    </div>
  );
};
export default MainPageBody;