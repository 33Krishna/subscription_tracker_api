import express from 'express'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// In-Built middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

// Error handler
app.use(errorMiddleware);

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!')
});

export default app;