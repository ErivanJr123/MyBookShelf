import { Router } from "express";
import { addBook, bookShelf, deleteBook, findBooks, updateStatusBook } from '../controllers/bookControllers.js';
import bookValidator from "../validator/bookValidator.js";
import { handleValidation } from '../middlewares/handleValidation.js';

const router = Router();

router.get('/', bookShelf);
router.get('/:id', bookValidator.forGetID, handleValidation, findBooks);
router.post('/', bookValidator.forCreate, handleValidation, addBook);
router.patch('/:id', bookValidator.forUpdate, handleValidation, updateStatusBook);
router.delete('/:id', bookValidator.forDelete,handleValidation, deleteBook);

router.use((req,res,next)=>{
    res.status(404).json({message:"Rota não encontrada"});
});

export default router;