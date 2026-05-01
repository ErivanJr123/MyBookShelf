import { books } from '../data/bookData.js';

//requisição
//READ
export const bookShelf = (req,res) => {
    res.status(200).json(books);
};
export const findBooks = (req,res) => {
    const {id} = req.params;
    const book = books.find((B)=> B.id === Number(id));
    req.status(200).json(book);
};
//CREATE
export const addBook = (req,res) =>{
    const newBook = {id: Date.now(), ...req.body};
    books.push(newBook)
    res.status(201).json(newBook);
};
//UPDATE
export const updateStatusBook = (req,res) => {
    const {id} = req.params;
    const book = books.find((B) => B.id === Number(id));
    if(!book){return res.status(404).json({message:"Livro não encontrado"})};
    if(req.body.reading_status) book.reading_status = req.body.reading_status;
    res.json(book);
};
//DELETE
export const deleteBook = (req,res) => {
    const {id} = req.params;
    const tam = books.length();
    books = books.filter((B) => B.id !== Number(id));

    if(tam === books.length()){res.status(404).json("Livro não encontrado")};
    res.status(204).send();
};