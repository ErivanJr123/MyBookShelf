import bookService from '../services/bookService.js';

//requisição
//READ
export const bookShelf = async (req,res,next) => {
    try {
        const books = await bookService.getAll();
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
};
export const findBooks = async (req,res,next) => {
    try {
        const {id} = req.params;
        const book = await bookService.findByID(id);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }

};
//CREATE
export const addBook = async (req,res,next) =>{
    try {
        const newBook = req.body;
        const bookDTO = await bookService.create(newBook);
        res.status(201).json(bookDTO);
    } catch (error) {
        next(error)
    }
};
//UPDATE
export const updateStatusBook = async (req,res,next) => {
    try {
        const {id} = req.params;
        const updatedBook = await bookService.update(id,req.body.status);
        res.status(200).json(updatedBook);
    } catch (error) {
        next(error)
    }
};
//DELETE
export const deleteBook = async (req,res,next) => {
    try {
        const {id} = req.params;
        const removeu = await bookService.delete(id);
        if(removeu){res.status(204).send()}
    } catch (error) {
        next(error)
    }
};