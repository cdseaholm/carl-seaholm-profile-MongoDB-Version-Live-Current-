'use client'

import { useState } from "react";

export default function NPAppsPage() {
    const [npDropdown, setNpDropdown] = useState(false);

    const npapps = [
        { name: "Financr App", description: "Description/Github" },
        { name: "Trackr App", description: "Description/Github" },
        { name: "Gamr App", description: "Description/Github" }
    ];

    return (
        <div className='flex justify-evenly flex-col items-center space-y-4'>
            <div className="flex justify-center">
                <h1 className="text-2xl">New Progress Applications</h1>
            </div>
            <div className="py-10">
                <div onClick={() => {
                    if (npDropdown === false) {
                        setNpDropdown(true)
                    } else {
                        setNpDropdown(false)
                    }
                }}>
                    <h2 className="text-2xl underline hover:text-slate-300">New Progress Applications</h2>
                </div>
                {npDropdown && npapps.map((app, index) => (
                    <div key={index}>
                        <li>{app.name}</li>
                        <p className="pl-10 pb-10">{app.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}