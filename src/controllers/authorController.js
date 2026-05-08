import { authorRepository } from "../repositories/authorRepository.js";

//requisição
//READ
export const authorsList = async (req,res) => {
    res.status(200).json(await authorRepository.getAll()); 
};
export const findAuthor = async (req,res) => {
    const {id} = req.params;
    const author = await authorRepository.findById(Number(id));
    if(!author){
        res.status(404).json({message:"Autor não encontrado"});
    }
    res.status(200).json(author);
};
//CREATE
export const addAuthor = async (req,res) => {
    const newAuthor = {id:Date.now(), ...req.body};
    await authorRepository.create(newAuthor);
    res.status(201).json(newAuthor);
};
//DELETE
export const deleteAuthor = async (req,res) => {
    const {id} = req.params;
    const removeu = await authorRepository.remove(Number(id));
    removeu? res.status(204).send(): res.status(404).json({message:"Autor não encontrado"})
};