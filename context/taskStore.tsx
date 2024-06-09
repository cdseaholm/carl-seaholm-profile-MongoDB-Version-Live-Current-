import { ITasksByUser, ITaskByDate, ITask } from '@/models/types/task';
import { create } from 'zustand';

interface TaskStore {
    taskDetailsToShow: ITask;
    setTaskDetailsToShow: (taskDetailsToShow: ITask) => void;
    tasksByUser: ITasksByUser;
    setTasksByUser: (tasksByUser: ITasksByUser) => void;
    tasksByDate: ITaskByDate;
    setTasksByDate: (tasksByDate: ITaskByDate) => void;
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    taskDetailsToShow: {} as ITask,
    setTaskDetailsToShow: (taskDetailsToShow) => set({taskDetailsToShow}),
    tasksByUser: {} as ITasksByUser,
    setTasksByUser: (tasksByUser) => set({tasksByUser}),
    tasksByDate: {} as ITaskByDate,
    setTasksByDate: (tasksByDate) => set({tasksByDate}),
    tasks: [],
    setTasks: (tasks) => set({tasks}),
}));