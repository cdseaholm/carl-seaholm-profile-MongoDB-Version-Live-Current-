const MainPageBody = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={`bg-slate-900/50 childFirst min-h-[500px] w-[100dvw] h-[100dvh] scrollbar-thin scrollbar-webkit`} style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      {children}
    </div>
  );
};
export default MainPageBody;