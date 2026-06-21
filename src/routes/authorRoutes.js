import { Router } from "express";
import { addAuthor, authorsList, deleteAuthor, findAuthor, updateAuthor } from '../controllers/authorController.js';
import authorValidator from "../validator/authorValidator.js";
import { handleValidation } from "../middlewares/handleValidation.js";
import { allow, authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', authorsList);
router.get('/:id', authorValidator.forGetID, handleValidation,findAuthor);
router.post('/', authenticate, allow('admin'), authorValidator.forCreate, handleValidation, addAuthor);
router.patch('/:id', authenticate, allow('admin'), authorValidator.forUpdate, handleValidation, updateAuthor);
router.delete('/:id', authenticate, allow('admin'), authorValidator.forDelete, handleValidation, deleteAuthor);

router.use((req,res,next)=>{
    res.status(404).json({message:"Rota não encontrada"});
});

export default router;