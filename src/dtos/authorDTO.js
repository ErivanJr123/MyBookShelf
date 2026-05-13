import normalize from "../utils/formatters.js";

class AuthorDTO{
    static database(data){
        return{
            id: data.id,
            nome: normalize.Nome(data.nome),
            nacionalidade: data.nacionalidade? normalize.Nome(data.nacionalidade): "",
            nascimento: data.nascimento
        }
    }
    static response(obj){
        return{
            id: obj.id,
            nome: obj.nome,
            nacionalidade: obj.nacionalidade1,
            nascimento: obj.nascimento
        }
    }
}
export default AuthorDTO;