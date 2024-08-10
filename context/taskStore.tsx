import { ITask } from '@/models/types/task';
import { create } from 'zustand';

interface TaskStore {
    taskDetailsToShow: ITask;
    setTaskDetailsToShow: (taskDetailsToShow: ITask) => void;
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    taskDetailsToShow: {} as ITask,
    setTaskDetailsToShow: (taskDetailsToShow) => set({taskDetailsToShow}),
    tasks: {} as ITask[],
    setTasks: (tasks) => set({tasks}),
}));