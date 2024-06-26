import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        blogsub: {
            type: Boolean,
            required: true
        },
        customFields: Schema.Types.Mixed
    },
    {
        timestamps: true
    }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;