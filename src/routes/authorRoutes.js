import { Router } from "express";
import { addAuthor, authorsList, deleteAuthor, findAuthor, updateAuthor } from '../controllers/authorController.js';
import authorValidator from "../validator/authorValidator.js";
import { handleValidation } from "../middlewares/handleValidation.js";

const router = Router();

router.get('/', authorsList);
router.get('/:id', authorValidator.forGetID, handleValidation,findAuthor);
router.post('/', authorValidator.forCreate, handleValidation, addAuthor);
router.patch('/',authorValidator.forUpdate, handleValidation, updateAuthor);
router.delete('/:id', authorValidator.forDelete, handleValidation, deleteAuthor);

router.use((req,res,next)=>{
    res.status(404).json({message:"Rota não encontrada"});
});

export default router;