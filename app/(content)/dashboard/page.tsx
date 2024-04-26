'use client'

import { useEffect, useState } from "react";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import { useSession } from "next-auth/react";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { IHobby } from "@/models/types/hobby";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useStateContext } from "@/app/context/state/StateContext";
import DashActionsButton from "@/components/pagecomponents/dashboard/buttons/dashactions";
import ModalHobby from "@/components/modals/hobbyModal/hobbymodal";
import DashFilterButton from "@/components/pagecomponents/dashboard/buttons/dashFilter";
import CalView from "@/components/pagecomponents/dashboard/views/calView";
import StatsView from "@/components/pagecomponents/dashboard/views/statsView";
import { useModalContext } from "@/app/context/modal/modalContext";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { FiMenu } from "react-icons/fi";


export default function Dashboard() {
    
    const [categories, setCategories] = useState([] as string[]);
    const [titles, setTitles] = useState([] as string[]);
    const { loading, setLoading } = useStateContext();
    const { data: session } = useSession();
    const { hobbies, setHobbies, openAddModal, filterItem, refreshKey } = useHobbyContext();
    const { urlToUse } = useStateContext();
    const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const isBreakpoint = useMediaQuery(768);
    const { setOpenDashboardMobileDropdown, calDash } = useModalContext();

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
        <div className="h-full w-full">
            <InnerHeader>
                <h1 className={`text-lg md:text-xl font-bold`}>Dashboard</h1>
            </InnerHeader>
            <MainChild>
              {loading ? (
                  <div className="flex flex-col justify-center items-center">
                    <h1>Loading...</h1>
                  </div>
                ) : (
                  <div className="p-2 h-full">
                    {!isBreakpoint &&
                      <div className={`flex flex-col md:flex-row top-0 z-20 items-start md:items-center justify-between`}>
                        <DashFilterButton titles={titles} categories={categories} />

                        {session?.user !== null && adminID === true &&
                            <DashActionsButton />
                        } 
                      </div>
                    }
                    {isBreakpoint &&
                        <FiMenu className="flex flex-row justify-start m-2" onClick={() => setOpenDashboardMobileDropdown(true)} />
                    }
                    <ModalHobby show={openAddModal} categories={categories} hobbies={hobbies} />
                    {calDash &&
                      <div className="flex flex-row justify-center items-center" >
                        <CalView filter={filterItem} hobbies={hobbies} />
                      </div>
                    }
                    {!calDash &&
                      <StatsView hobbies={hobbies} daysThisMonth={30} />
                    }
                  </div>
                )
              }
            </MainChild>
        </div>
    );
};