import { Router } from "express";
import { login, newUser, listAllUsers, promoteUser, showUser, updateUser, deleteUser, addBookToshelf, showShelf, updateShelfBookStatus, removeBookFromShelf } from "../controllers/userController.js";
import userValidator from "../validator/userValidator.js"
import { handleValidation } from "../middlewares/handleValidation.js";
import { allow, authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/login', userValidator.forLogin, handleValidation, login);
router.post('/register', userValidator.forCreate, handleValidation, newUser);
router.get('/', authenticate, allow('admin'), listAllUsers);
router.patch('/:id/promote', authenticate, allow('admin'), userValidator.forId, handleValidation, promoteUser)
router.get('/:id', authenticate, allow(), userValidator.forId, handleValidation, showUser);
router.patch('/:id', authenticate, allow(), userValidator.forUpdate, handleValidation, updateUser);
router.delete('/:id', authenticate, allow(), userValidator.forId, handleValidation, deleteUser);
router.post('/:id/shelf', authenticate, allow(), userValidator.forId, handleValidation, addBookToshelf);
router.get('/:id/shelf', authenticate, allow(),  userValidator.forId, handleValidation, showShelf);
router.put('/:id/shelf/:bookID', authenticate, allow(), userValidator.forUpdateStatus, handleValidation, updateShelfBookStatus);
router.delete('/:id/shelf/:bookID', authenticate, allow(), userValidator.forDelete, handleValidation, removeBookFromShelf);

router.use((req,res,next)=>{
    res.status(404).json({message:"Rota não encontrada"});
});

export default router;