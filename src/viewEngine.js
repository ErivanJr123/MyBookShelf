import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import viewRoutes from './routes/viewRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const setupViewEngine = (app) => {
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views'));
    app.use(express.static(path.join(__dirname, './public')));
    
    app.use('/', viewRoutes);
};

export default setupViewEngine;
