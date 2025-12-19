import express from 'express'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

// In-Built middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ArcJet shouldn't use globally -- Best Practice
// app.use(arcjetMiddleware)

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', arcjetMiddleware, subscriptionRouter)
app.use('/api/v1/workflows', arcjetMiddleware, workflowRouter);

// Error handler
app.use(errorMiddleware);

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!')
});

export default app;