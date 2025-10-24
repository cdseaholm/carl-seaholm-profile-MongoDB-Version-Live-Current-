const ScrollerTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-transparent w-full h-dvh overflow-y-auto scrollbar-thin scrollbar-webkit">
      {children}
    </div>
  );
};
export default ScrollerTemplate;