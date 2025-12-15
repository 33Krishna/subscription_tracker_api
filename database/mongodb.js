import mongoose from "mongoose";
import { DB_URI } from "../config/env";

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to database in mode');
    } catch (error) {
        console.log('Error connecting to database:', error);
        process.exit(1);
    }
}

export default connectDB;