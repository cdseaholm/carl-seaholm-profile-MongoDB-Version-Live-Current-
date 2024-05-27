'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import StatsView from "@/components/pagecomponents/dashboard/views/statsView";
import { useModalContext } from "@/app/context/modal/modalContext";
import CalendarView from "@/components/pagecomponents/dashboard/views/calendarView";
import ActionButton from "@/components/buttons/actionbutton";
import ToDoList from "@/components/pagecomponents/dashboard/views/todolist";
import { useStateContext } from "@/app/context/state/StateContext";
import { Spinner } from "@/components/misc/Spinner";


export default function Dashboard() {
    
    const { data: session } = useSession();
    const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const { loading } = useStateContext();
    const { setModalOpen } = useModalContext();
    const { filterItem } = useHobbyContext();
    const [toShow, setToShow] = useState(adminID ? 'todo' : 'stats');

    if (loading) {
      return (
        <Spinner />
      )
    }
    return (
      <MainChild>
        <h1 className={`text-lg md:text-xl font-bold text-center`}>Dashboard</h1>
          <div className="flex flex-col px-2 pb-2" style={{height: '96.5%'}}>
            <div className="flex flex-row justify-between items-center px-5 py-2">
              <div className="flex flex-row justify-between items-center space-x-5">
                <button className="text-base hover:bg-gray-400" onClick={() => {
                  setModalOpen('calendar');
                }}>
                  {'Calendar'}
                </button>
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
            {toShow === 'calendar' &&
              <CalendarView filter={filterItem} />
            }
            {toShow === 'stats' &&
              //enter a month changer here to hold the month value since I'm elevating the state here
              <StatsView daysThisMonth={30} />
            }
            {toShow === 'todo' &&
              <ToDoList />
            }
          </div>
        </div>
      </MainChild>
  );
};