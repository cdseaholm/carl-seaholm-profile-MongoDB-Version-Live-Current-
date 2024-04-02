'use client'

import { fetchHobbies } from '@/app/api/prisma/queries/hobbies';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateRequest } from '@/lib/auth';
import { Hobby } from '@/types/hobby';

const HobbyPage = () => {

    const router = useRouter();
    const hobbies = fetchHobbies;
    const [hobbiesList, setHobbiesList] = useState<Hobby[]>([]);
    const [hobbySelected, setHobbySelected] = useState('');
    const [hobbyName, setHobbyName] = useState('');
    const [openDrop, setOpenDrop] = useState(false);


    useEffect(() => {(async () => {
                const hobbies = await fetchHobbies();
                if (!hobbies) {
                    return 'No hobbies found.'
                } else {
                    setHobbiesList(hobbies as unknown as Hobby[]);
                }
                console.log(hobbies);
        })();
    }, []);


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