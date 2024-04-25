'use client'


import { useModalContext } from "@/app/context/modal/modalContext";

export default function DashDropChangeViewButton ()  {
  
    const { calDash, setCalDash } = useModalContext();
    
    const setFalse = () => {
        setCalDash(false);
    };

    const setTrue = () => {
        setCalDash(true);
    }
  
      return (
          <div className="flex flex-col">
              <div className={`font-bold hover:bg-gray-400 rounded-lg p-1 ${calDash ? 'border border-gray-700' : ''} cursor-pointer text-xs`} onClick={setTrue}>
                  Calendar
              </div>
              <div className={`font-bold hover:bg-gray-400 rounded-lg p-2 ${!calDash ? 'border border-gray-700' : ''} cursor-pointer text-xs`} onClick={setFalse}>
                  Stats
              </div>
          </div>
      );
  };