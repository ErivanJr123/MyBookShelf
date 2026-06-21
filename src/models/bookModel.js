import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    titulo: {type: String, required: true},
    publicacao: {type: Number, required: true},
    exemplar: {type: Number, default: 1},
    autorID: {type: String, ref: "Author", required: true}
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})
export default mongoose.model("Book",bookSchema,"Books");