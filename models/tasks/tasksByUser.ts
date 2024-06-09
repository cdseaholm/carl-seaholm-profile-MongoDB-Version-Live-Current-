import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: String,
    time: String,
    description: String,
    completed: Boolean,
    _id: String,
    createdAt: String,
    updatedAt: String
});

const tasksByDateSchema = new Schema({
    tasks: [taskSchema],
    date: String,
    _id: String,
    createdAt: String,
    updatedAt: String
});

const tasksByUserSchema = new Schema({
    tasksByDate: [tasksByDateSchema],
    user_email: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const TasksByUser = mongoose.models.TasksByUser || mongoose.model("TasksByUser", tasksByUserSchema);

export default TasksByUser;