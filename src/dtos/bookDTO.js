import normalize from "../utils/formatters.js";

class BookDTO{
    static database(data){
        return {
            id: data.id,
            titulo: normalize.Titulo(data.titulo),
            publicacao: data.publicacao,
            status: data.status,
            autorID: data.autorID
        }
    }
    static response(obj){
        return{
            id: obj.id,
            titulo: obj.titulo,
            publicacao: obj.publicacao,
            status: obj.status,
            autorID: obj.autorID
        }
    }
}

export default BookDTO;