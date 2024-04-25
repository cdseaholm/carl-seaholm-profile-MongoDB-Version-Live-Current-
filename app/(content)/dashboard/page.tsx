'use client'

import { useEffect, useState } from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import { useSession } from "next-auth/react";
import DashChild from "@/components/pagecomponents/dashboard/dashChild";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { IHobby } from "@/models/types/hobby";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useStateContext } from "@/app/context/state/StateContext";


export default function Dashboard() {
    
    const [categories, setCategories] = useState([] as string[]);
    const [titles, setTitles] = useState([] as string[]);
    const { loading, setLoading } = useStateContext();
    const { data: session } = useSession();
    const { hobbies, setHobbies, setRefreshKey, refreshKey } = useHobbyContext();
    const { urlToUse } = useStateContext();
    const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;

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
    }, [refreshKey]);

    useEffect(() => {
      setLoading(true);
      if (hobbies.length === 0) {
        setLoading(false);
        return;
      }
      setTitles(hobbies.map((hobby: IHobby) => hobby.title));
      setCategories(hobbies.map((hobby: IHobby) => hobby.categories).flat())
      setLoading(false);
      console.log('categories', categories);
          
    }, [hobbies]);
    

    return (
        <div>
            <InnerHeader>
              <div className="flex flex-col justify-end">
                 <h1 className={`text-xl md:text-4xl font-bold`}>Dashboard</h1>
              </div>
            </InnerHeader>
            <MainChild>
              {loading ? (
                  <div className="flex flex-col justify-center items-center">
                    <h1>Loading...</h1>
                  </div>
                ) : (
                  <DashChild categories={categories} titles={titles} hobbies={hobbies} adminID={adminID}/>
                )
              }
            </MainChild>
        </div>
    );
};