import { JWT_SECRET } from "../config/env";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "./catchAsync.js";
import jwt from 'jsonwebtoken'

const authorize = catchAsync(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return new ApiError(401, 'Unauthorized');

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId)

    if(!user) return new ApiError(401, 'Unauthorize');

    req.user = user;

    next();
});

export default authorize;