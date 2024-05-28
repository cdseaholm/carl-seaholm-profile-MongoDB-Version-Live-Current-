 // app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react';
import { useCallback, useEffect } from 'react';
import MainModal from '@/components/modals/mainmodal/mainmodal';
import AlertModal from '@/components/modals/Alert/alertmodal';
import { useStateStore } from '@/context/stateStore';
import { useStore } from '@/context/dataStore';
import { getHobbies } from './context/functions/getHobbies';
import { getRecipes } from './context/functions/getRecipes';
import { getTasks } from './context/functions/getTasks';
import { getCategories } from './context/functions/getCategories';
import { useHobbyStore } from '@/context/hobbyStore';

export function Providers({children}: { children: React.ReactNode }) {
  
  const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const urlToUse = useStateStore((state) => state.urlToUse);
  const setLoading = useStateStore((state) => state.setLoading);
  const setTasks = useStore((state) => state.setTasks);
  const setHobbies = useStore((state) => state.setHobbies);
  const setRecipes = useStore((state) => state.setRecipes);
  const setCategories = useHobbyStore((state) => state.setCategories);

    const getData = useCallback(async () => {
      setLoading(true);
      if (urlToUse === '') {
        console.error('No URL to use');
        setLoading(false);
        return;
      } else {
        try {
          if (userID !== undefined && userID !== null && userID !== '') {
            const hobs = await getHobbies(urlToUse, userID);
            setHobbies(hobs);
            const tsks = await getTasks(urlToUse, userID);
            setTasks(tsks);
            const recipes = await getRecipes(urlToUse, userID);
            setRecipes(recipes);
            const categories = await getCategories(hobs);
            setCategories(categories);
          } else {
            console.log('No user ID');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    }, [urlToUse, userID, setHobbies, setTasks, setRecipes, setCategories, setLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
    <AlertModal />
    <MainModal />
      <NextUIProvider style={{height: '100%', width: '100%'}}>
        {children}
      </NextUIProvider>
    </>
  )
}