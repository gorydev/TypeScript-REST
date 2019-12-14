import express, { Application, Request, Response, NextFunction } from 'express';
import authRoutes from './routes/auth';

const app: Application = express();

// settings
app.set('port', 3000);

// middlewares
app.use(express.json());
// routes
app.use('/api/auth', authRoutes);

export default app;
