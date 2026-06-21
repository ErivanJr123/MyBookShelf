import normalize from "../utils/formatters.js";

class BookDTO{
    static database(data){
        return {
            id: data.id,
            titulo: normalize.Titulo(data.titulo),
            publicacao: data.publicacao,
            exemplar: data.exemplar ?? 1,
            autorID: data.autorID
        }
    }
    static response(obj){
        return{
            id: obj.id,
            titulo: obj.titulo,
            publicacao: obj.publicacao,
            exemplar: obj.exemplar,
            autorID: obj.autorID
        }
    }
    static update(data){
        const allowedFields = ["titulo", "publicacao","exemplar"];
        const cleanData = {};
        allowedFields.forEach(F => {if(data[F] !== undefined) cleanData[F] = data[F]});
        return cleanData;
    }
}

export default BookDTO;