'use client'

import { useEffect, useState } from "react";



export default function Page() {
    const [ hobbies, setHobbies ] = useState([]);
    useEffect(() => {
        const getHobbies = async () => {
            const gottenHobbies = await fetch('/api/hobbies/getall')
            .then(res => res.json())
            .then(data => {
                console.log('hobs', data.hobbiesToPass);
                console.log('data', data);
                setHobbies(data.hobbiesToPass)
            })
            .catch(err => console.log(err));
            console.log(gottenHobbies);
        };
        getHobbies();
        
    }, []);


    return (
        <div>
        <h1>HELLO! THIS IS RENDERING</h1>
        <div>
            {hobbies.map((hobby: any) => {
                return (
                    <div key={hobby.id}>
                        <h2>{hobby.title}</h2>
                        <p>{hobby.descriptions}</p>
                    </div>
                )
            })};
        </div>
        </div>
    );
}