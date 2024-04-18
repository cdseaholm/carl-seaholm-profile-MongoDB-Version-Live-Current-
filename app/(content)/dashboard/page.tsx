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
        const response = await fetch('/api/hobbies/getall', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }).catch(e => {
            console.error('Fetch error:', e);
        });
      
          if (response.status === 404) {
            console.log('No hobbies found');
          } else if (!response.hobbies || response.hobbies.length === 0) {
            console.log('No hobbies found');
          } else {
            setHobbies(response.hobbies);
            setTitles(response.hobbies.map((hobby: Hobby) => hobby.title));
            setCategories(response.hobbies.map((hobby: Hobby) => hobby.categories).flat());
          }
        };
    
        getHobbies();
      }, [user]);
    
    const updateHobbies = async () => {
      const response = await fetch('/api/hobbies/getall', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }).catch(e => {
          console.error('Fetch error:', e);
      });
  
      if (response.status === 404) {
        console.log('No hobbies found');
      } else if (!response.hobbies || response.hobbies.length === 0) {
        console.log('No hobbies found');
      } else {
        setHobbies(response.hobbies);
        setTitles(response.hobbies.map((hobby: Hobby) => hobby.title));
        setCategories(response.hobbies.map((hobby: Hobby) => hobby.categories).flat());
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