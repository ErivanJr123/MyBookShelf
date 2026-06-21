import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    nome: {type: String, required: true},
    nacionalidade: {type: String},
    nascimento: {type: Number, required: true}
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

export default mongoose.model("Author", authorSchema, "Authors");