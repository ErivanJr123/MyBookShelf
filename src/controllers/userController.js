import userService from '../services/userService.js';

export const login = async (req, res, next) =>{
    try {
        const { login , senha } = req.body;
        const token = await userService.auth(login, senha);
        res.status(200).json({message:"Login efetuado com sucesso", token: token})
    } catch (error) {
        next(error);
    }
}
export const newUser = async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await userService.create(data);
        res.status(201).json(newUser)
    } catch (error) {
        next(error);
    }
}
export const listAllUsers = async (req, res, next) =>{
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
export const showUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getByID(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
export const promoteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const promote = await userService.promoteToAdmin(id);
        res.status(200).json(promote);
    } catch (error) {
        next(error);
    }
}
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...data } = req.body;
        const updatedUser = await userService.update(id,data);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userService.remove(id);
        res.status(204).send()
    } catch (error) {
        next(error);
    }
}
export const addBookToshelf = async (req , res, next) => {
    try {
        const userID = req.params.id;
        const { bookID, status = null } = req.body;
        const bookAdded = await userService.addBook(userID, { id: bookID, status });
        res.status(201).json(bookAdded);
    } catch (error) {
        next(error);
    }
}
export const showShelf = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const shelf = await userService.getShelf(id);
        res.status(200).json(shelf);
    } catch (error) {
        next(error);
    }
}
export const updateShelfBookStatus = async (req, res, next) => {
    try {
        const { id, bookID } = req.params;
        const { status } = req.body;
        const updatedBook = await userService.updateBookStatus(id,bookID,status);
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
}
export const removeBookFromShelf = async (req, res, next) => {
    try {
        const { id, bookID } =req.params;
        await userService.removeBook(id, bookID);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}