'use client'

import { useSession } from "next-auth/react";
import { useState } from "react";
import MainDashboard from "@/components/pagecomponents/dashboard/mainDash";
import { useModalStore } from "@/context/modalStore";
import { useStore } from "@/context/dataStore";

export default function DashboardPage() {

  const { data: session, status } = useSession();
  const [dashToShow, setDashToShow] = useState('');
  const userFields = useStore((state) => state.userObjects);
  const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  const handleDashToShow = (dashToShow: string, handleModalOpen: string | null) => {
    setDashToShow(dashToShow);
    if (handleModalOpen) {
      setModalOpen(handleModalOpen);
    }
  }

  return (
    <MainDashboard customFields={userFields} session={session ? session : null} status={status} dashToShow={dashToShow} handleDashToShow={handleDashToShow} adminID={adminID} />
  );
};