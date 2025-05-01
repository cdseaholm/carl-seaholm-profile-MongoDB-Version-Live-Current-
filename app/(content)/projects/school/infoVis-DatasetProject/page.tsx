"use client";


import Link from "next/dist/client/link";
import MainWrapper from "./components/components/templates/mainWrapper";

export default function Home() {
  const buttonClass = `backdrop-blur-md rounded-md w-[90%] md:w-[80%] lg:w-[70%] h-content text-white text-bold font-sans text-lg sm:text-xl md:text-2xl bg-slate-300/20 hover:bg-slate-600/20 hover:underline text-center p-4`;
  return (
    <MainWrapper landing={true}>
      <div className="flex flex-col items-end justify-start text-center w-full h-content text-end px-1 md:px-6">
        <h1 className="text-2xl md:text-4xl underline font-semibold text-bold text-white">
          {`Welcome to the Dataset Project for CSPB 4122`}
        </h1>
        <h1 className="text-xl md:text-2xl underline font-semibold text-bold text-gray-300">
          {`Wine Quality Edition`}
        </h1>
        <h2 className="text-base md:text-lg text-semibold text-gray-400">Project created by Carl Seaholm</h2>
      </div>

      <div className="flex flex-col justify-center items-center w-full h-[80%] space-y-12">
        <Link href={`/projects/school/infoVis-DatasetProject/components/story`} className={buttonClass}>
          {`Dataset Story`}
        </Link>
        <Link href={`/projects/school/infoVis-DatasetProject/components/data`} className={buttonClass}>
          {`Self Analysis Walkthrough`}
        </Link>
        <Link href={`/projects/school/infoVis-DatasetProject/components/test`} className={buttonClass}>
          {`See the raw Wine CSV data this comes from`}
        </Link>
        <Link href={`/`} className={buttonClass}>
          {`Back to Carl's Portfolio`}
        </Link>
      </div>
    </MainWrapper>
  );
}
