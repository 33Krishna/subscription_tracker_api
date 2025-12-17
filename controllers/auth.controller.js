import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'
import catchAsync from '../middlewares/catchAsync.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'

export const signUp = catchAsync(async (req, res) => {
    // sessions
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            throw new ApiError(409, 'User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // end session
        await session.commitTransaction();
        session.endSession();

        res.status(201).json(
            new ApiResponse(201, 'User createed succesfully', {
                token,
                user: newUsers[0]
            })
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
});

export const signIn = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, 'User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password');
    }

    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json(
        new ApiResponse(200, 'User signed in successfully', {
            token,
            user
        })
    );
});

export const signOut = catchAsync(async () => {});