const MainPageBody = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={`bg-slate-900/50 childFirst h-full w-full`}>
      {children}
    </div>
  );
};
export default MainPageBody;