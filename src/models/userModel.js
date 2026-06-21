import mongoose from "mongoose";

const shelfSchema = new mongoose.Schema({
    id: {type: String, ref: "Book", required: true},
    status: {
        type: String,
        enum: ["Ler", "Lendo", "Lido"],
        required: true
    },
    atualizacao: {type: String, required: true}
},{_id: false})

const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    nome: {type: String, required: true},
    email: {type: String, required: true},
    login: {type: String, required: true},
    senha: {type: String, required: true},
    papel:{type: String, enum: ["admin","usuario"], default: "usuario", required: true},
    estante: [shelfSchema]
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})
 export default mongoose.model("User", userSchema, "Users");