import { Router } from "express";
import { addBook, bookShelf, deleteBook, findBooks, updateStatusBook } from '../controllers/bookControllers.js';

const router = Router();

router.get('/',bookShelf);
router.get('/:id',findBooks);
router.post('/',addBook);
router.patch('/:id',updateStatusBook);
router.delete('/:id',deleteBook);

router.use((req,res,next)=>{
    res.status(404).json({message:"Rota não encontrada"});
});

export default router;