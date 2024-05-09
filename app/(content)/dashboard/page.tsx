'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useStateContext } from "@/app/context/state/StateContext";
import StatsView from "@/components/pagecomponents/dashboard/views/statsView";
import { useModalContext } from "@/app/context/modal/modalContext";
import CalendarView from "@/components/pagecomponents/dashboard/views/calendarView";
import ActionButton from "@/components/buttons/actionbutton";


export default function Dashboard() {
    
    const { data: session } = useSession();
    const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;

    const { hobbies, setHobbies, filterItem, refreshKey } = useHobbyContext();
    const { urlToUse } = useStateContext();
    const {calDash, setCalDash } = useModalContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const getHobbies =  async () => {
        try {
          setLoading(true);
          const response = await fetch(`${urlToUse}/api/${userID}/gethobbies`, {
            next: {
              revalidate: 3600
            }
          });
    
          if (!response.ok) {
            console.log('No hobbies found');
            setLoading(false);
            return;
          }
          if (response.ok) {
            const res = await response.json();
            const hobs = res.hobbies;
            if (hobs.length === 0) {
              console.log('No hobbies found');
              setLoading(false);
              return;
            }
            setHobbies(hobs);
          }
        } catch (error) {
          console.error('Error fetching hobbies', error);
          return;
        } finally {
          console.log('refreshed Key', refreshKey);
          setLoading(false);
          return;
        }
      }
      
      getHobbies();
    }, [refreshKey, urlToUse, userID, setLoading, setHobbies]);
    
    useEffect(() => {
      setLoading(true);
      if (hobbies.length === 0) {
        setLoading(false);
        return;
      }
      setLoading(false);
          
    }, [hobbies, setLoading]);
    

    return (
            <MainChild>
              <h1 className={`text-lg md:text-xl font-bold text-center`}>Dashboard</h1>
              {loading ? (
                  <div className="justify-center items-center">
                    <h1>Loading...</h1>
                  </div>
                ) : (
                  <div className="px-2 pb-5 w-full h-full">
                    <div className="flex flex-row justify-between items-center px-5 py-2">
                      <button className="text-base" onClick={() => setCalDash(!calDash)}>
                            {calDash ? 'See stats' : 'See Timeline'}
                      </button>
                      {adminID ? (
                        <ActionButton whichModal="actions"/>
                      ) : <div />}
                    </div>
                    <div className={`justify-start items-center bg-gray-500/70 rounded-md overflow-hidden flex-grow `} style={{height: "96%", width: '100%'}}>
                      {calDash &&
                        <CalendarView filter={filterItem} hobbies={hobbies} />
                      }
                      {!calDash &&
                        <StatsView hobbies={hobbies} daysThisMonth={30} />
                      }
                    </div>
                  </div>
                )
              }
            </MainChild>
    );
};