import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoUri = (globalThis as any).process?.env?.MONGO_URI;
        await mongoose.connect(mongoUri!);

        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);

        (globalThis as any).process?.exit?.(1);
    }
};