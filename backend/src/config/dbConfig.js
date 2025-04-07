import mongoose from "mongoose";
import { MONGODB_URL } from "./serverConfig.js";

export const connectDB = async () => {
    try {
        const response = await mongoose.connect(MONGODB_URL);
        console.log("Connected to mongodb database");
        return response;
    } catch (error) {
        console.log("Error connecting to database", error);
    }

};