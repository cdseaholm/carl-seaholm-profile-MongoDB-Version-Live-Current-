"use client";

import Link from "next/link";
import { IoMdHome } from "react-icons/io";

export default function Header() {
  return (
    <header className={`flex flex-row justify-between px-8 py-4 items-center w-screen h-content border-b border-gray-200/20 `}>
      <Link href={"/projects/school/infoVis-DatasetProject"} className={`flex flex-row justify-start items-center w-1/2`}>
        <IoMdHome title="Home" size={22} className="text-gray-100"/>
      </Link>
      <p title="By Carl Seaholm" className={`flex flex-row items-center w-1/2 justify-end text-gray-100`}>Dataset Project</p>
    </header>
  );
}
