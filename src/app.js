import express from 'express';
import setupViewEngine from './viewEngine.js';
import userRoutes from './routes/userRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import viewRoutes from './routes/viewRoutes.js';
import globalErrorHandler from './middlewares/errorMiddleware.js';
import setupDocumentation from './docs/swagger.js';

const app = express();
app.use(express.json());

setupDocumentation(app);
setupViewEngine(app);

app.use('/', viewRoutes);

app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

app.use(globalErrorHandler);
export default app;