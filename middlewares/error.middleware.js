import log from '../utils/logger.js'

const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err }
        error.message = err.message;
        
        log.error(err);

        // Mongoose bad ObjectId
        if(err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key
        if(err.code === 11000) {
            const message = 'Duplicate field value entered'
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose Validation error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        const statusCode = error.statusCode || 500;

        if (process.env.NODE_ENV === "development") {
            return res.status(statusCode).json({
                success: false,
                message: error.message,
                error: err,
                stack: err.stack
            });
        }
    
        // PRODUCTION (clean output)
        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;