'use client'

import React, { useState } from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useSession } from "@/app/SessionContext";
import fetchHobbies from "@/lib/prisma/queries/hobbies";
import type { Hobby } from "@/types/hobby";
import CatsAndHobs from "@/components/functions/catsandhobs";
import DashChild from "@/components/pagecomponents/dashboard/dashChild";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";

const Dashboard = () => {
    
    const isBreakpoint = useMediaQuery(768);
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [categories, setCategories] = useState([] as string[]);
    const [titles, setTitles] = useState([] as string[]);
    const { user } = useSession();
  

    React.useEffect(() => {
      const getHobbies = async () => {
        if (user) {
          const gottenHobbies = await fetchHobbies({user});
          setHobbies(gottenHobbies);
          console.log(gottenHobbies);
          if (gottenHobbies) {
            const { cats, hobbes } = await CatsAndHobs({hobbies: gottenHobbies});
            setTitles(hobbes);
            setCategories(cats);
          }
        }
      }
      getHobbies();
    }, [user, setCategories, setTitles]);
    
    const updateHobbies = async () => {
      if (user) {
        const gottenHobbies = await fetchHobbies({user});
        setHobbies(gottenHobbies);
        if (gottenHobbies) {
          const { cats, hobbes } = await CatsAndHobs({hobbies: gottenHobbies});
          setTitles(hobbes);
          setCategories(cats);
        }
      }
    };

    return (
        <div>
            <InnerHeader>
              <div className="flex flex-col justify-end">
                 <h1 className={`${isBreakpoint ? 'text-xl' : 'text-4xl'} font-bold`}>Dashboard</h1>
              </div>
            </InnerHeader>
            <MainChild>
              <DashChild user={user} categories={categories} titles={titles} hobbies={hobbies} updateHobbies={updateHobbies}/>
            </MainChild>
        </div>
    );
};

export default Dashboard;