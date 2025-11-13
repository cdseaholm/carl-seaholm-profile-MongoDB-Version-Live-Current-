import mongoose, { Model, Schema } from "mongoose";
import { ITask } from "../old/types/task";

const taskSchema = new Schema({
    title: String,
    time: String,
    date: String,
    description: String,
    completed: Boolean,
    _id: String,
    createdAt: String,
    updatedAt: String
});

const tasksByUserSchema = new Schema({
    tasks: [taskSchema],
    user_email: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const TasksByUser = mongoose.models.TasksByUser || mongoose.model("TasksByUser", tasksByUserSchema);

export default TasksByUser as Model<ITask>;