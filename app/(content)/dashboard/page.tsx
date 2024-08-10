'use client'

import { useSession } from "next-auth/react";
import { useState } from "react";
import MainDashboard from "@/components/pagecomponents/dashboard/mainDash";
import { useModalStore } from "@/context/modalStore";
import { useStore } from "@/context/dataStore";
import { useHobbyStore } from "@/context/hobbyStore";
import { useTaskStore } from "@/context/taskStore";
import { IHobby } from "@/models/types/hobby";
import { ITask } from "@/models/types/task";

export default function DashboardPage() {

  const { data: session, status } = useSession();
  const [dashToShow, setDashToShow] = useState('');
  const hobbies = useStore((state) => state.hobbies) as IHobby[];
  const tasks = useTaskStore((state) => state.tasks) as ITask[];
  const categories = useHobbyStore((state) => state.categories) as string[];
  const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  const handleDashToShow = (dashToShow: string, handleModalOpen: string | null) => {
    setDashToShow(dashToShow);
    if (handleModalOpen) {
      setModalOpen(handleModalOpen);
    }
  }

  return (
    <MainDashboard hobbies={hobbies} tasks={tasks} categories={categories} session={session ? session : null} status={status} dashToShow={dashToShow} handleDashToShow={handleDashToShow} adminID={adminID} />
  );
};