'use client'

import fetchHobbies from '../../../lib/prisma/queries/hobbies';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Hobby } from '@/types/hobby';
import { useSession } from '@/app/SessionContext';

const HobbyPage = () => {

    const router = useRouter();
    const hobbies = fetchHobbies;
    const [hobbiesList, setHobbiesList] = useState<Hobby[]>([]);
    const [hobbySelected, setHobbySelected] = useState('');
    const [hobbyName, setHobbyName] = useState('');
    const [openDrop, setOpenDrop] = useState(false);
    const { user } = useSession();


    useEffect(() => {(async () => {
                if (!user) {
                    alert('You must be logged in to view this page.');
                } else {
                const hobbies = await fetchHobbies({user});
                if (!hobbies) {
                    return 'No hobbies found.'
                } else {
                    setHobbiesList(hobbies as unknown as Hobby[]);
                }
                console.log(hobbies);
            }
        })();
    }, [user, setHobbiesList]);


    return (
        <div className="flex justify-evenly flex-col items-center space-y-4">
                <h1 className="text-2xl">
                Hobby Corner
                </h1>
                <div className='flex flex-row justify-evenly space-x-4'>
                    <div className='flex flex-col'>
                    <button onClick={() => setOpenDrop(true)}>
                        Search for Hobby
                    </button>
                    {openDrop &&
                        <div className='flex flex-col'>
                            {hobbiesList.map((hobby, index) => (
                                <button key={index} onClick={() => setHobbySelected(hobby.title)}>
                                    {hobby.title}
                                </button>
                            ))}
                            {hobbiesList.length === 0 || !hobbiesList &&
                                <p>
                                    No hobbies found.
                                </p>
                            }
                        </div>
                    }
                    </div>
                    <input type="text" placeholder="Create a hobby" onChange={(e) => setHobbyName(e.target.value)} />
                </div>
                <button >
                    Search
                </button>
        </div>
    );
};

export default HobbyPage;