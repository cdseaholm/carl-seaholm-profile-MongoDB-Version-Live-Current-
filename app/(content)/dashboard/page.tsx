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


export default function Dashboard() {
    
    const loading = useStateStore((state) => state.loading);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const filterItem = useHobbyStore((state) => state.filterItem);
    const toShow = useStateStore((state) => state.dashToShow);
    const setToShow = useStateStore((state) => state.setDashToShow);
    const { data: session, status } = useSession();
    const adminID = useStore((state) => state.adminID);
    const setAdminID = useStore((state) => state.setAdminID);

    useEffect(() => {
      if (status === 'authenticated') {
        const id = session?.user?.email;
        if (id === process.env.NEXT_PUBLIC_ADMIN_USERNAME) {
          setAdminID(true);
        } else {
          setAdminID(false);
        }
      }
    }, [status, session, setAdminID]);

    useEffect(() => {
      if (adminID) {
        setToShow('stats');
      } else {
        setToShow('todo');
      }
    }, [filterItem, adminID, setToShow]);
    
    return (
      <MainChild>
        <h1 className={`text-lg md:text-xl font-bold text-center`}>Dashboard</h1>
          <div className="flex flex-col px-2 pb-2" style={{height: '96.5%'}}>
            <div className="flex flex-row justify-between items-center px-5 py-2">
              <div className="flex flex-row justify-between items-center space-x-5">
                {toShow !== 'calendar' ? 
                  <button className="text-base hover:bg-gray-400" onClick={() => {
                    setModalOpen('calendar');
                  }}>
                    {'Calendar'}
                  </button> 
                : 
                  <button className="text-base hover:bg-gray-400" onClick={() => {
                    setModalOpen('calendar');
                  }}>
                    {'Select Day'}
                  </button>
                }
                <button className="text-base hover:bg-gray-400" onClick={() => {
                  setToShow('stats');
                }}>
                  {"Stats"}
                </button>
                <button className="text-base hover:bg-gray-400" onClick={() => {
                    setToShow('todo');
                }}>
                  {"To-Do List"}
                </button>
              </div>
              {adminID ? (
                <ActionButton whichModal="actions"/>
              ) : <div />}
            </div>
            <div className={`bg-gray-500/70 rounded-md overflow-hidden`} style={{flexGrow: 1}}>
            {loading && <Spinner/>}
            {toShow === 'calendar' && !loading &&
              <CalendarView />
            }
            {toShow === 'stats' && !loading &&
              //enter a month changer here to hold the month value since I'm elevating the state here
              <StatsView daysThisMonth={30} />
            }
            {toShow === 'todo' && !loading &&
              <ToDoList />
            }
          </div>
        </div>
      </MainChild>
  );
};