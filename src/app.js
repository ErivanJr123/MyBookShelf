import express from 'express';
import setupViewEngine from './viewEngine.js';
import authorRoutes from './routes/authorRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import viewRoutes from './routes/viewRoutes.js';
import globalErrorHandler from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());

setupViewEngine(app)

app.use('/', viewRoutes);

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

app.use(globalErrorHandler);
export default app;