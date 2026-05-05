import { Router } from "express";
import { addAuthor, authorsList, deleteAuthor, findAuthor } from '../controllers/authorController.js';
import { ruleAuthorValidation } from "../validator/authorValidator.js";

const router = Router();

router.get('/', authorsList);
router.get('/:id', findAuthor);
router.post('/', ruleAuthorValidation, addAuthor);
router.delete('/', deleteAuthor);

router.use((req,res,next)=>{
    res.status(404).json({message:"Rota não encontrada"});
});

export default router;