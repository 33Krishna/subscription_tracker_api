import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";
import log from '../utils/logger.js'

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        log.success(`Connected to database in ${NODE_ENV} mode`);
    } catch (error) {
        log.error('Error connecting to database:', error.message);
        process.exit(1);
    }
}

export default connectDB;