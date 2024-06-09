export interface ITask {
    task: any;
    title: string;
    time: string;
    description: string;
    user_email: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    completed: boolean;
}

export interface ITaskByDate {
    tasks: ITask[];
    date: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface ITasksByUser {
    tasksByDate: ITaskByDate[];
    user_email: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}