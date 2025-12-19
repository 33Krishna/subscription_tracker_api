import catchAsync from './catchAsync.js'
import aj from '../config/arcjet.js';
import ApiError from '../utils/ApiError.js'

const arcjetMiddleware = catchAsync(async (req, res, next) => {
    const decision = await aj.protect(req, { requested: 1 });

    if(decision.isDenied()) {
        if(decision.reason.isRateLimit()) throw new ApiError(429, 'Rate limit exceeded');
        if(decision.reason.isBot()) throw new ApiError(403, 'Bot detected')
        
        throw ApiError(403, 'Access denied');
    }

    next();
});

export default arcjetMiddleware;