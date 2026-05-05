import { authors } from "../data/authorData.js";

//requisição
//READ
export const authorsList = (req,res) => {
    res.status(200).json(authors); 
};
export const findAuthor = (req,res) => {
    const {id} = req.params;
    const author = authors.find((A) => A.id === Number(id));
    if(!author){
        res.status(404).json({message:"Autor não encontrado"});
    }
    res.status(200).json(author);
};

//CREATE
export const addAuthor = (req,res) => {
    const newAuthor = {id:Date.now(), ...req.body};
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
};
//DELETE
export const deleteAuthor = (req,res) => {
    const {id} = req.params;
    authors.filter((A) => A.id !== Number(id));
    res.status(204).send();
};