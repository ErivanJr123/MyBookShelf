import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const setupViewEngine = (app) => {
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views'));
    app.use(express.static(path.join(__dirname, './public')));
};

export default setupViewEngine;