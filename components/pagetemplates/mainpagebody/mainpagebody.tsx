const MainPageBody = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={`childFirst h-full w-full`}>
      {children}
    </div>
  );
};
export default MainPageBody;