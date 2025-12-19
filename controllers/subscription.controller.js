import catchAsync from "../middlewares/catchAsync.js";
import Subscription from '../models/subscription.model.js'
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createSubscription = catchAsync(async (req, res) => {
    const subscription = await Subscription.create({
        ...req.body,
        user: req.user._id
    });

    res.status(201).json(
        new ApiResponse(201, 'Subscription created successfully', {
            subscription
        })
    )
});

export const getUserSubscription = catchAsync(async (req, res) => {
    if(req.user.id !== req.params.id) {
        throw new ApiError(401, 'You are not the owner of this account')
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json(
        new ApiResponse(200, 'Get User All Subscriptions', {
            subscriptions
        })
    )
});