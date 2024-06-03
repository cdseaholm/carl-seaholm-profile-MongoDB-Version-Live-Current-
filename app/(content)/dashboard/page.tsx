'use client'

import { useEffect, useState } from "react";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import StatsView from "@/components/pagecomponents/dashboard/views/statsView";
import CalendarView from "@/components/pagecomponents/dashboard/views/calendarView";
import ActionButton from "@/components/buttons/actionbutton";
import ToDoList from "@/components/pagecomponents/dashboard/views/todolist";
import { useStore } from '@/context/dataStore';
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/misc/Spinner";
import { useStateStore } from "@/context/stateStore";
import { useModalStore } from "@/context/modalStore";
import { useHobbyStore } from "@/context/hobbyStore";
import { getCategories } from "@/app/context/functions/getCategories";
import { getTasks } from "@/app/context/functions/getTasks";
import { signal } from '@preact/signals-react';
import { getHobbies } from "@/app/context/functions/getHobbies";

const name = signal(0);
console.log(name);

export default function Dashboard() {

  //context
  const { data: session, status } = useSession();
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const setDashToShow = useHobbyStore((state) => state.setDashToShow);
  const toShow = useHobbyStore((state) => state.dashToShow);
  const urlToUse = useStateStore((state) => state.urlToUse);
  const setTasks = useStore((state) => state.setTasks);
  const setCategories = useHobbyStore((state) => state.setCategories);
  const setHobbies = useStore((state) => state.setHobbies);

  //state
  const [loading, setLoading] = useState(true);

  //variables
  const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const adminIDBool = status === 'authenticated' && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;

  //functions
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME) {
      setDashToShow('todo');
    } else {
      setDashToShow('stats');
    }
    const getData = async () => {
      if (urlToUse === '' || urlToUse === null || urlToUse === undefined || userID === '' || userID === null || userID === undefined) {
        console.error('Error in getting data, urlToUse or userID is not set');
        console.log('urlToUse:', urlToUse);
        console.log('userID:', userID);
        return;
      } else {
        const hobs = await getHobbies(urlToUse, userID);
        setHobbies(hobs);
        const tsks = await getTasks(urlToUse, userID);
        setTasks(tsks);
        const categories = await getCategories(hobs);
        setCategories(categories);
      }
    }
    getData();
    setLoading(false);
  }, [setLoading, setTasks, setCategories, urlToUse, userID, status, session, setDashToShow]);

  return (
    loading ? 
    (
      <Spinner />
    ):(
      <MainChild>
        <h1 className={`text-lg md:text-xl font-bold text-center`}>
          Dashboard
        </h1>
        <div className="flex flex-col px-2 pb-2" style={{height: '96.5%'}}>
          <div className="flex flex-row justify-between items-center px-5 py-2">
            <div className="flex flex-row justify-between items-center space-x-5">
              {toShow !== 'calendar' ? 
                (
                  <button className="text-base hover:bg-gray-400" onClick={() => {
                    setModalOpen('calendar');
                    setDashToShow('calendar');
                  }}>
                    {'Calendar'}
                  </button> 
                ):(
                  <button className="text-base hover:bg-gray-400" onClick={() => {
                    setModalOpen('calendar');
                    setDashToShow('calendar');
                  }}>
                    {'Select Day'}
                  </button>
                )
              }
              <button className="text-base hover:bg-gray-400" onClick={() => {
                setDashToShow('stats');
              }}>
                {"Stats"}
              </button>
              <button className="text-base hover:bg-gray-400" onClick={() => {
                setDashToShow('todo');
              }}>
                {"To-Do List"}
              </button>
            </div>
            {adminIDBool ? 
              (
                <ActionButton whichModal="actions"/>
              ):(
                <div />
              )
            }
          </div>
          <div className={`bg-gray-500/70 rounded-md overflow-hidden`} style={{flexGrow: 1}}>
            {toShow === 'calendar' && 
              <CalendarView adminID={adminIDBool} />
            }
            {toShow === 'stats' && 
            //enter a month changer here to hold the month value since I'm elevating the state here
              <StatsView />
            }
            {toShow === 'todo' && 
              <ToDoList adminID={adminIDBool} />
            }
          </div>
        </div>
      </MainChild>
    )
  );
};