import normalize from "../utils/formatters.js";

class AuthorDTO{
    static database(data){
        return{
            id: data.id,
            nome: data.nome?normalize.Nome(data.nome):"",
            nacionalidade: data.nacionalidade? normalize.Nome(data.nacionalidade): "",
            nascimento: data.nascimento
        }
    }
    static response(obj){
        return{
            id: obj.id,
            nome: obj.nome,
            nacionalidade: obj.nacionalidade,
            nascimento: obj.nascimento
        }
    }
    static update(data){
        const allowedFields = ["nome", "nacionalidade", "nascimento"];
        const cleanData = {};
        allowedFields.forEach(F => {if(data[F] !== undefined) cleanData[F] = data[F]});
        return cleanData;
    }
}
export default AuthorDTO;