import { Router } from "express";
import { registerNewBook, listBooksWithFilter, deleteBook, findBooks, modifyCopy } from '../controllers/bookControllers.js';
import bookValidator from "../validator/bookValidator.js";
import { handleValidation } from '../middlewares/handleValidation.js';
import { allow, authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', listBooksWithFilter); // essa rota utiliza o query, por isso serve como uma búsca dinamica
router.get('/:id', bookValidator.forGetID, handleValidation, findBooks);// enquanto essa é mais restrita para a busca exclusiva de livros
router.post('/', authenticate, allow('admin'), bookValidator.forCreate, handleValidation, registerNewBook);
router.patch('/:id', authenticate, allow('admin'), bookValidator.forUpdate, handleValidation, modifyCopy);
router.delete('/:id', authenticate, allow('admin'), bookValidator.forDelete,handleValidation, deleteBook);

router.use((req,res,next)=>{
    res.status(404).json({message:"Rota não encontrada"});
});

export default router;