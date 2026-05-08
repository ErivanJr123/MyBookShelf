import { bookRepository } from '../repositories/bookRepository.js';

//requisição
//READ
export const bookShelf = async (req,res) => {
    res.status(200).json(await bookRepository.getAll());
};
export const findBooks = async (req,res) => {
    const {id} = req.params;
    const book = await bookRepository.findbyID(Number(id));
    req.status(200).json(book);
};
//CREATE
export const addBook = async (req,res) =>{
    const newBook = {id: Date.now(), ...req.body};
    await bookRepository.create(newBook);
    res.status(201).json(newBook);
};
//UPDATE
export const updateStatusBook = async (req,res) => {
    const {id} = req.params;
    const book = await bookRepository.update(Number(id),req.body.status);
    if(!book){res.status(404).json({message:"Livro não encontrado"})};
    res.json(book);
};
//DELETE
export const deleteBook = async (req,res) => {
    const {id} = req.params;
    const removeu = await bookRepository.remove(Number(id));
    removeu? res.status(204).send(): res.status(404).json({message:"Livro não encontrado"});
};