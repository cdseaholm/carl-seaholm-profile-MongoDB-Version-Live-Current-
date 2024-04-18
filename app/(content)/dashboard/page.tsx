'use client'

import { useEffect, useState } from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useSession } from "@/app/context/session/SessionContext";
import DashChild from "@/components/pagecomponents/dashboard/dashChild";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { Hobby } from "@/models/types/hobby";


export default function Dashboard() {
    
    const isBreakpoint = useMediaQuery(768);
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [categories, setCategories] = useState([] as string[]);
    const [titles, setTitles] = useState([] as string[]);
    const { user } = useSession();
    const adminID = user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
  
    useEffect(() => {
      const getHobbies = async () => {
          await fetch('/api/hobbies/getall')
          .then(res => res.json())
          .then(data => {
              if (data.hobbies) {
                setHobbies(data.hobbies)
                setTitles(data.hobbies.map((hobby: Hobby) => hobby.title));
                setCategories(data.hobbies.map((hobby: Hobby) => hobby.categories).flat());
              }
          })
          .catch(err => console.log(err));
      };
      getHobbies();
    }, []);
    
    const updateHobbies = async () => {
        await fetch('/api/hobbies/getall')
        .then(res => res.json())
        .then(data => {
            console.log('hobs', data.hobbies);
            console.log('data', data);
            if (data.hobbies) {
              setHobbies(data.hobbies)
              setTitles(data.hobbies.map((hobby: Hobby) => hobby.title));
              setCategories(data.hobbies.map((hobby: Hobby) => hobby.categories).flat());
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <InnerHeader>
              <div className="flex flex-col justify-end">
                 <h1 className={`${isBreakpoint ? 'text-xl' : 'text-4xl'} font-bold`}>Dashboard</h1>
              </div>
            </InnerHeader>
            <MainChild>
              <DashChild user={user} categories={categories} titles={titles} hobbies={hobbies} updateHobbies={updateHobbies} adminID={adminID}/>
            </MainChild>

        </div>
    );
};