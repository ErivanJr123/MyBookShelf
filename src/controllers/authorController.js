import authorService from '../services/authorService.js';

//requisição
//READ
export const authorsList = async (req,res,next) => {
    try {
        const authorsList = await authorService.getAll();
        res.status(200).json(authorsList);
    } catch (error) {
        next(error)
    }
};
export const findAuthor = async (req,res,next) => {
    try {
        const {id} = req.params;
        const author = await authorService.findById(id);
        res.status(200).json(author);        
    } catch (error) {
        next(error);
    }
};
//CREATE
export const addAuthor = async (req,res,next) => {
    try {
        const newAuthor = req.body;
        const authorDTO = await authorService.create(newAuthor);
        res.status(201).json(authorDTO);
    } catch (error) {
        next(error);
    }
};
//UPDATE
export const updateAuthor = async (req,res,next) => {
    try {
        const { id } = req.params;
        const update = req.body;
        
        const updateDTO = await authorService.update(id,update);
        res.status(200).json(updateDTO);
    } catch (error) {
        next(error);
    }
}
//DELETE
export const deleteAuthor = async (req,res,next) => {
    try {
        const {id} = req.params;
        await authorService.remove(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};