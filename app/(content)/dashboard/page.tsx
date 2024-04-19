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
    //let url = process.env.NEXT_PUBLIC_BASE_URL 
    let url = process.env.NEXT_PUBLIC_BASE_LIVEURL;
    const adminID = user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
  
    useEffect(() => {
      const getHobbies = async () => {
        try {
          const response = await fetch(`${url}/api/hobbies/getall`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'force-cache',
            next: {
              revalidate: 3600,
              tags: ['hobbies'],
            },
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${data.message}`);
          }
      
          const hobbiesPassed = data.hobs;
      
          if (!hobbiesPassed || hobbiesPassed.length === 0) {
            console.log('No hobbies found');
          } else {
            setHobbies(hobbiesPassed);
            setTitles(hobbiesPassed.map((hobby: Hobby) => hobby.title));
            setCategories(hobbiesPassed.map((hobby: Hobby) => hobby.categories).flat());
          }
        } catch (e) {
          console.error('Fetch error:', e);
        }
      };
    
      getHobbies();
    }, [user, url]);
    
    const updateHobbies = async () => {
      try {
        const response = await fetch(`${url}/api/hobbies/getall`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'force-cache',
          next: {
            revalidate: 3600,
            tags: ['hobbies'],
          },
          mode: 'cors',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const hobbiesPassed = data.hobs;
  
        if (!hobbiesPassed || hobbiesPassed.length === 0) {
          console.log('No hobbies found');
        } else {
          setHobbies(hobbiesPassed);
          setTitles(hobbiesPassed.map((hobby: Hobby) => hobby.title));
          setCategories(hobbiesPassed.map((hobby: Hobby) => hobby.categories).flat());
        }
      } catch (e) {
        console.error('Fetch error:', e);
      }
    }

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