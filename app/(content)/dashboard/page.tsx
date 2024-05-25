'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useStateContext } from "@/app/context/state/StateContext";
import StatsView from "@/components/pagecomponents/dashboard/views/statsView";
import { useModalContext } from "@/app/context/modal/modalContext";
import CalendarView from "@/components/pagecomponents/dashboard/views/calendarView";
import ActionButton from "@/components/buttons/actionbutton";
import { useRouter } from "next/navigation";
import ActionsModal from "@/components/modals/modalContent/Actions/actionsmodal";
import ToDoList from "@/components/pagecomponents/dashboard/views/todolist";
import { get } from "http";
import { TotalMinutesCalc } from "@/components/pagecomponents/dashboard/helpers/totalminutescalc";
import { Spinner } from "@/components/misc/Spinner";
import { set } from "mongoose";
import { ITask } from "@/models/types/task";


export default function Dashboard() {
    
    const { data: session } = useSession();
    const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const { urlToUse } = useStateContext();
    const {hobbies, setHobbies, modalOpen, setModalOpen } = useModalContext();
    const { filterItem, refreshKey } = useHobbyContext();
    const [toShow, setToShow] = useState(adminID ? 'todo' : 'stats');
    const [loading, setLoading] = useState(true);
    const [localTasks, setLocalTasks] = useState<ITask[]>([]);
    
    useEffect(() => {
      const getHobbies =  async () => {
        try {
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
          setLoading(false);
          return;
        } finally {
          console.log('refreshed Key', refreshKey);
          setLoading(false);
          return;
        }
      }
      getHobbies();
    }, [refreshKey, urlToUse, userID, setHobbies]);

    useEffect(() => {
      const getTasks = async () => {
          try {
              const response = await fetch(`${urlToUse}/api/${userID}/gettasks`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
              if (!response.ok) {
                  console.log('No tasks found');
                  return;
              }
              if (response.ok) {
                  const res = await response.json();
                  if (res.status === 404) {
                      return;
                  }
                  const tasksToUse = res.tasks.map((task: ITask) => {
                      return {
                          title: task.title,
                          time: task.time,
                          description: task.description,
                          date: task.date,
                          user_email: task.user_email,
                          _id: task._id,
                          createdAt: task.createdAt,
                          updatedAt: task.updatedAt,
                          completed: task.completed
                      }
                  });
                  setLocalTasks(tasksToUse);
              }
          } catch (error) {
              console.error('Error fetching tasks', error);
              return;
          }
      }
      getTasks();
  }, [modalOpen, urlToUse, userID]);

    

    return (
            <MainChild>
              <h1 className={`text-lg md:text-xl font-bold text-center`}>Dashboard</h1>
              {loading ? (
                  <div className="justify-center items-center">
                    <Spinner />
                  </div>
                ) : (
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
                        <StatsView hobbies={hobbies} daysThisMonth={30} />
                      }
                      {toShow === 'todo' &&
                        <ToDoList tasks={localTasks} />
                      }
                    </div>
                  </div>
                )
              }
            </MainChild>
    );
};