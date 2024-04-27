 // app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ModalProvider} from '@/app/context/modal/modalContext'
import { SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalLogin from '@/components/modals/auth/login/loginModal';
import ModalSignUp from '@/components/modals/auth/signup/signupModal';
import AlertModal from '@/components/modals/alertModal/alertmodal';
import { HobbyProvider } from './context/hobby/hobbyModalContext';
import LogSessionModal from '@/components/modals/hobbyModal/logsession';
import EditUser from '@/components/modals/auth/editUser/editUser';
//import { User } from '@/models/user';
import ModalSubscribe from '@/components/modals/subscribe/subscribeModal';
import { IHobby } from '@/models/types/hobby';
import { StateProvider } from './context/state/StateContext';
import DashboardMobileDropdown from '@/components/modals/dashboardmobiledrop/dashboardmobiledropdown';

export function Providers({children}: { children: React.ReactNode }) {

  //appStates
  const [loading, setLoading] = useState(false);
  const [urlToUse, setUrlToUse] = useState('');


  //modalStates
  const [showModal, setShowModal] = useState(false);
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openLogSessionModal, setOpenLogSessionModal] = useState(false);
  const [modalSubscribeOpen, setModalSubscribeOpen] = useState(false);
  const [openDashboardMobileDropdown, setOpenDashboardMobileDropdown] = useState(false);
  const [hobbyToShow, setHobbyToShow] = useState<IHobby[] | null>(null);

  //alertStates
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertParent, setAlertParent] = useState('');
  const [alertConfirm, setAlertConfirm] = useState(false);

  //hobbyStates
  const [filterItem, setFilterItem] = useState('');
  const [categoryPassed, setCategoryPassed] = useState('');
  const [showEditUser, setShowEditUser] = useState(false);
  const [daySelected, setDaySelected] = useState('');
  const [colorChoice, setColorChoice] = useState('#000000');
  const [hobbies, setHobbies] = useState([] as IHobby[]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [calDash, setCalDash] = useState(true);

  //variables
  const router = useRouter();


  const swapAuthDesire = async () => {
    console.log('swapAuthDesire');
    {/**if (modalSignUpOpen) {
      setModalSignUpOpen(false);
      setShowModal(true);
    } else if (showModal) {
      setShowModal(false);
      setModalSignUpOpen(true);
    }*/}
  };

  const swapDashDesire = async () => {
    if (openAddModal) {
      setOpenAddModal(false);
      setOpenLogSessionModal(true);
    } else if (setOpenLogSessionModal) {
      setOpenLogSessionModal(false);
      setOpenAddModal(true);
    }
  }

  const handleModalNewTrack = async () => {
    setOpenAddModal(true);
  }

  const handleModalLogSesh = async () => {
    setOpenLogSessionModal(true);
  }

  return (
    <StateProvider loading={loading} setLoading={setLoading} urlToUse={urlToUse} setUrlToUse={setUrlToUse}>
      <ModalProvider modalOpen={showModal} setModalOpen={setShowModal} setModalSignUpOpen={setModalSignUpOpen} modalSignUpOpen={modalSignUpOpen} swapAuthDesire={swapAuthDesire} showAlert={showAlert} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} alertMessage={alertMessage} alertParent={alertParent} setAlertParent={setAlertParent} alertConfirm={alertConfirm} setAlertConfirm={setAlertConfirm} setShowEditUser={setShowEditUser} showEditUser={showEditUser} modalSubscribeOpen={modalSubscribeOpen} setModalSubscribeOpen={setModalSubscribeOpen} setColorChoice={setColorChoice} colorChoice={colorChoice} swapDashDesire={swapDashDesire} openDashboardMobileDropdown={openDashboardMobileDropdown} setOpenDashboardMobileDropdown={setOpenDashboardMobileDropdown} calDash={calDash} setCalDash={setCalDash} handleModalNewTrack={handleModalNewTrack} handleModalLogSesh={handleModalLogSesh}>
        <ModalLogin/>
        <ModalSignUp/>
        <AlertModal/>
        <EditUser/>
        <ModalSubscribe/>
        <DashboardMobileDropdown/>
        <HobbyProvider openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} filterItem={filterItem} setFilterItem={setFilterItem} categoryPassed={categoryPassed} setCategoryPassed={setCategoryPassed} openCategoryModal={openCategoryModal} setOpenCategoryModal={setOpenCategoryModal} openLogSessionModal={openLogSessionModal} setOpenLogSessionModal={setOpenLogSessionModal} setDaySelected={setDaySelected} daySelected={daySelected} setHobbies={setHobbies} hobbies={hobbies} setRefreshKey={setRefreshKey} refreshKey={refreshKey} hobbyToShow={hobbyToShow} setHobbyToShow={setHobbyToShow} >
          <LogSessionModal show={openLogSessionModal} />
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </HobbyProvider>
      </ModalProvider>
    </StateProvider>
  )
}