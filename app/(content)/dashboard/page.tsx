'use client'

import React, { useState } from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useSession } from "@/app/context/session/SessionContext";
import type { Hobby } from "@/types/hobby";
import DashChild from "@/components/pagecomponents/dashboard/dashChild";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";


const Dashboard = () => {
    
    const isBreakpoint = useMediaQuery(768);
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [categories, setCategories] = useState([] as string[]);
    const [titles, setTitles] = useState([] as string[]);
    const { user } = useSession();
    const adminID = user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
  

    React.useEffect(() => {
      const getHobbies = async () => {
        console.log('Getting hobbies');
      }});

      const updateHobbies = async () => {
        console.log('Updating hobbies');
      }
          {/**const gottenHobbies = await fetchHobbies({user, adminID});
          setHobbies(gottenHobbies);
          if (gottenHobbies) {
            const { cats, hobbes } = await CatsAndHobs({hobbies: gottenHobbies});
            setTitles(hobbes);
            setCategories(cats);
          }
        
      }
      getHobbies();
    }, [user, setCategories, setTitles, adminID, setHobbies]);
    
    const updateHobbies = async () => {
        const gottenHobbies = await fetchHobbies({user, adminID});
        setHobbies(gottenHobbies);
        if (gottenHobbies) {
          const { cats, hobbes } = await CatsAndHobs({hobbies: gottenHobbies});
          setTitles(hobbes);
          setCategories(cats);
        
      }
    };*/}

    return (
        <div>
            <InnerHeader>
              <div className="flex flex-col justify-end">
                 <h1 className={`${isBreakpoint ? 'text-xl' : 'text-4xl'} font-bold`}>Dashboard</h1>
              </div>
            </InnerHeader>
            <MainChild>
              {user &&

            <DashChild user={user} categories={categories} titles={titles} hobbies={hobbies} updateHobbies={updateHobbies} adminID={adminID}/>
              }
            </MainChild>

        </div>
    );
};

export default Dashboard;