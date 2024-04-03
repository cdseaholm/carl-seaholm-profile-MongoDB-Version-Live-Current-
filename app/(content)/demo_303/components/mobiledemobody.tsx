    'use client'

import React, { useRef } from "react";

const MobileDemoBody = () => {
    const divRef = useRef(null);
return (
<div className="bg-black/80 rounded-md mt-5 mx-5">
                <div style={{ maxHeight: '90vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}} ref={divRef}>
                    <h1 className="m-10 flex justify-center text-4xl text-white font-bold">303 Training Center</h1>
                    <h2 className="m-10 flex flex-col justify-center text-md text-white font-bold">
                    <p className="text-center">BRAZILIAN JIU JITSU</p>
                        <p className="text-center">SELF DEFENSE</p>
                        <p className="text-center">WRESTLING</p>
                        
                    </h2>
                    <div className="flex justify-center">
                        <img src="/images/303door.png" alt="303 Training Center" className="rounded-md w-4/5" />
                    </div>
                    <h3 className="m-10 flex flex-col justify-center text-lg text-white font-bold">
                        <p className="text-center">PROUDLY SERVING  WESTMINSTER, ARVADA, BROOMFIELD, THORNTON, NORTHGLENN, SUPERIOR, BOULDER & DENVER</p>
                        <p className="text-center">est 2010</p>
                    </h3>
                    <div className="text-white">
                        <h1 className="text-xl text-center bg-red-800/70 py-1">Welcome to the 303 Training Center!</h1>
                        <h2 className="text-center py-1 pb-3">This is a Black Belt Academy</h2>
                        <h3 className="text-center bg-red-800/70">At the 303 Training Center! Whether you&apos;re a beginner or a seasoned martial arts expert, we have something for everyone!</h3>
                        <div className=" flex flex-col space-y-4 p-5">
                            <p>Our beautiful and always super clean facility is over 6,000 sqaure feet and is equipped with over 3500 square feet of mat space that is covered with the best  top of the line Dollamur Mats. Not only that but they also lay a top of a beautiful $25,000 floating and solid reinforced flooring!</p>
                        <p>Add that with some of Colorados best and good hearted people... this makes for truly the cleanest, nicest, softest and best mat to train martial arts on in all of Colorado!</p>
                        <p>We&apos;re conveniently located in beautiful downtown Westminster, just one minute from Highway 36 and 10 minutes away from Broomfield, Arvada, Thornton, Northglenn and Superior. 15 minutes from Denver and Boulder.</p>
                        <p>Welcome to 303&apos;s newest location in the heart of Olde Town Arvada! We are conveniently located just off of Olde Wadsworth Blvd, right across the street from Fuzzy&apos;s Tacos. You can&apos;t  miss us!</p>
                        <p>At the 303 Training Center, we offer classes for adults and children of all levels</p>
                        <p>Whether you&apos;re a complete beginner or an experienced grappler, wrestler, Brazilian Jiu Jitsu practitioner, kick boxer or MMA fighter the 303 Training Center has exactly what you need in a 2023 cutting edge Brazilian Jiu Jitsu / Martial Arts academy.</p> 
                        <p>Our instructors are dedicated professionals who will make sure you get the most out of every class. Our Brazilian Jiu Jitsu classes are designed to be fun but also demanding so that you can progress quickly while still staying safe.</p>
                        <p>Each class is tailored to your individual skill level so that you can learn at your own pace.</p>
                        <p>We also offer kickboxing, wrestling and MMA  for those who want to increase their cardiovascular endurance as well as learn more about self-defense techniques using wrestling techniques, boxing gloves and other equipment.</p>
                        <p>Our instructors are highly skilled Brazilian Jiu Jitsu professionals who will help you develop your skills as well as build your confidence on the streets, mats and life in general!</p>
                        <p>We understand that our students need access to important news and updates regarding upcoming events such as MMA news, results, health tips, Brazilian Jiu Jitsu tournaments and seminars.</p>
                        <p>That&apos;s why we have made it easy for them by creating this website  as a tool they can utilize and stay up-to-date on everything that is happening at our training center including blogs about liu jitsu, striking, self defense tips and techniques for improving their performance in competitions or self-defense scenarios.</p>
                        <p>So if you&apos;re looking for an excellent Brazilian Jiu Jitsu school near Westminster, Broomfield, Arvada, Fedral Heights, Superior, Thornton, Northglenn, Boulder or Denver then look no further than the 303 Training Center &ndash; we promise that once you step foot inside our facility, you won&apos;t want to leave! Browse around our website for more information on Brazilian Jiu Jitsu, important news updates, blogs or reach out directly so we can assist you with any questions or inquiries regarding our classes and instructors &ndash; we look forward to hearing from you soon!</p>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
export default MobileDemoBody;