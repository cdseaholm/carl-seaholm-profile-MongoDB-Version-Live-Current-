import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: [String],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: [String]
    },
    description: {
        type: [String]
    },
    user_email: {
        type: String,
        required: true
    },
    completed: {
        type: [Boolean],
        default: false
    }
}, {
    timestamps: true
});

const Task = models.Task || mongoose.model("Task", taskSchema);

export default Task;