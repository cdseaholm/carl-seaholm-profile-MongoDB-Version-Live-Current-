'use client'

import { Spinner } from "@/components/misc/Spinner";
import { IField } from "@/models/types/field";
import { IUserObject } from "@/models/types/userObject";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";

export default function ToDoComp({ adminID, loading, filteredTasks, smallBreakpoint, isBreakpoint, handleCheckboxClick, handleDetailSelect }: { adminID: boolean, loading: boolean, filteredTasks: IUserObject[], smallBreakpoint: boolean, isBreakpoint: boolean, handleCheckboxClick: (task: IUserObject) => void, handleDetailSelect: (task: IUserObject) => void }) {

    return (
        loading ? (
            <Spinner />
        ) : (
            filteredTasks.length === 0 ? (
                <h1 className={`border-y border-neutral-700 text-sm md:text-base font-semibold text-center w-4/5 self-center py-10 my-5`}>No tasks found</h1>
            ) : (
                <div className={`flex flex-col items-center justify-center border-y border-neutral-700 ${smallBreakpoint ? 'py-8 my-2 w-full mx-2' : isBreakpoint ? 'py-8 my-2 w-full mx-2' : 'py-10 my-5 w-4/5'} space-y-2`}>
                    {filteredTasks.map((task: IUserObject, i: number) => {
                        const checkboxToClick = task.fields.find((field: IField) => field.value === 'completed');
                        return (
                            <div className={`flex flex-row items-center justify-center w-full bg-stone-300 rounded-md`} key={i}>
                                <div className={`flex flex-grow justify-start items-center p-2 space-x-5`} style={{ width: '48%' }}>
                                    <input id={`checkboxTask${i}${task._id}`} aria-label={`checkboxTask${i}${task._id}`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded hover:ring-blue-500 hover:ring-blue-600 hover:ring-2 cursor-pointer" onChange={() => {
                                        if (checkboxToClick) {
                                            handleCheckboxClick(task);
                                        }
                                    }} checked={checkboxToClick?.value === 'true' ? true : false} title={`${checkboxToClick?.value === 'true' ? 'Mark Incomplete' : 'Mark Complete'}`} />
                                    <p className={`text-sm md:text-base font-semibold text-start overflow-ellipsis overflow-hidden`} id={`titleTask${i}${task._id}`} aria-label={`titleTask${i}${task._id}`}>
                                        {task.fields.find((field: IField) => field.value === 'title')?.value}
                                    </p>
                                </div>
                                <div className={`flex flex-row items-start justify-start space-x-5 px-2 border-l border-black`} style={{ width: '20%' }}>
                                    <p className={`p-1 text-sm md:text-base text-start`} id={`timeTask${i}${task._id}`} aria-label={`timeTask${i}${task._id}`}>
                                        {new Date(`1970-01-01T${task.fields.find((field: IField) => field.value === 'time')?.value}:00Z`).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center justify-evenly space-x-5 px-2 border-l border-black" style={{ width: '32%' }}>
                                    <div className="p-2 hover:bg-gray-400 cursor-pointer rounded-md" title="Details" id={`detailsTask${i}${task._id}`} aria-label={`detailsTask${i}${task._id}`} onClick={() => handleDetailSelect(task)}>
                                        <FiMessageSquare className={`text-sm md:text-base`} />
                                    </div>
                                    {adminID ? (
                                        <>
                                            <div className="p-2 hover:bg-gray-400 cursor-pointer rounded-md" title="Edit" id={`editTask${i}${task._id}`} aria-label={`editTask${i}${task._id}`}>
                                                <FiEdit className={`text-sm md:text-base`} />
                                            </div>
                                            <div className="p-2 hover:bg-gray-400 cursor-pointer rounded-md" title="Delete" id={`deleteTask${i}${task._id}`} aria-label={`deleteTask${i}${task._id}`}>
                                                <FiTrash2 className={`text-sm md:text-base`} />
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        )
    );
}