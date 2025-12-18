import catchAsync from '../middlewares/catchAsync.js'
import User from '../models/user.model.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'

export const getUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    if(!users) {
        throw new ApiError(404, 'Users not found!')
    }

    res.status(200).json(new ApiResponse(200, 'Get users successfully', users));
});

export const getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user) {
        throw new ApiError(404, 'User not found!')
    }

    res.status(200).json(new ApiResponse(200, 'Get user successfully',{ user }));
});