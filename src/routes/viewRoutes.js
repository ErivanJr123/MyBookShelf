import { Router } from 'express';
const router = Router();

const render = (view) => (req,res) => res.render(view)

router.get('/', render('index'));

router.get('/authors', render('authors'));
router.get('/authors/new', render('new-author'));
router.get('/authors/:id', render('author-details'));

router.get('/books', render('books'));
router.get('/books/new', render('new-book'));
router.get('/books/:id', render('book-details'));

export default router;
