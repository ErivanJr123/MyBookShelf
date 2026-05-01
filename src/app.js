import express from 'express';
import authorRoutes from './routes/authorRoutes.js';
import bookroutes from './routes/bookRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/authors',authorRoutes);
app.use('/api/books',bookroutes);

export default app;