 // app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ModalProvider} from '@/app/context/modal/modalContext'
import { useState } from 'react';
import { HobbyProvider } from './context/hobby/hobbyModalContext';
import { IHobby } from '@/models/types/hobby';
import { StateProvider } from './context/state/StateContext';
import MainModal from '@/components/modals/mainmodal/mainmodal';
import { AlertProvider } from './context/alert/alertcontext';

export function Providers({children}: { children: React.ReactNode }) {

  //appStates
  const [loading, setLoading] = useState(false);
  const [urlToUse, setUrlToUse] = useState('');


  //modalStates
  const [showModal, setShowModal] = useState('');
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [hobbyToShow, setHobbyToShow] = useState<IHobby[] | null>(null);

  //alertStates
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertParent, setAlertParent] = useState('');
  const [alertConfirm, setAlertConfirm] = useState(false);

  //hobbyStates
  const [filterItem, setFilterItem] = useState('');
  const [categoryPassed, setCategoryPassed] = useState('');
  const [daySelected, setDaySelected] = useState('');
  const [colorChoice, setColorChoice] = useState('#000000');
  const [hobbies, setHobbies] = useState([] as IHobby[]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [calDash, setCalDash] = useState(true);
  const [categories, setCategories] = useState([] as string[]);
  const [titles, setTitles] = useState([] as string[]);

  const resetAlert = async () => {
    setAlertMessage('');
    setAlertParent('');
    setAlertConfirm(false);
    setShowAlert(false);
  }

  return (
    <StateProvider loading={loading} setLoading={setLoading} urlToUse={urlToUse} setUrlToUse={setUrlToUse}>
      <AlertProvider showAlert={showAlert} setShowAlert={setShowAlert} alertMessage={alertMessage} setAlertMessage={setAlertMessage} alertParent={alertParent} setAlertParent={setAlertParent} alertConfirm={alertConfirm} setAlertConfirm={setAlertConfirm} resetAlert={resetAlert}>
        <ModalProvider modalOpen={showModal} setModalOpen={setShowModal} setColorChoice={setColorChoice} colorChoice={colorChoice} calDash={calDash} setCalDash={setCalDash}>
          <MainModal />
          <HobbyProvider filterItem={filterItem} setFilterItem={setFilterItem} categoryPassed={categoryPassed} setCategoryPassed={setCategoryPassed} openCategoryModal={openCategoryModal} setOpenCategoryModal={setOpenCategoryModal} setDaySelected={setDaySelected} daySelected={daySelected} setHobbies={setHobbies} hobbies={hobbies} setRefreshKey={setRefreshKey} refreshKey={refreshKey} hobbyToShow={hobbyToShow} setHobbyToShow={setHobbyToShow} categories={categories} setCategories={setCategories} titles={titles} setTitles={setTitles}>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </HobbyProvider>
        </ModalProvider>
      </AlertProvider>
    </StateProvider>
  )
}