import mongoose, { Model, Schema, models } from "mongoose";
import { IRecipe } from "./types/recipe";

const recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        notes: {
            type: String
        },
        user: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        link: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Recipe = models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe as Model<IRecipe>;