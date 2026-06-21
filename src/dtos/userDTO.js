class UserDTO{
    static database(data){
        return {
            id: data.id,
            nome: data.nome,
            login: data.login,
            senha: data.senha,
            email: data.email,
            papel: data.papel?data.papel:"usuario",
            estante: data.estante?data.estante:[]
        }
    }
    static update(data){
        const allowedFields = ["nome", "login", "senha", "email"];
        const cleanData = {};
        allowedFields.forEach(f=>{if( data[f] !== undefined) cleanData[f]=data[f]});
        return cleanData;
    }
    static tokenPayload(obj){
        return {
            id: obj.id,
            papel: obj.papel
        }
    }
    static response(obj){
        return {
            id: obj.id,
            nome: obj.nome,
            email: obj.email,
            papel: obj.papel
        }
    }
    static detailedResponse(obj){
        return {
            id: obj.id,
            nome: obj.nome,
            login: obj.login,
            email: obj.email
        }
    }
    static bookStatus(data){
        return {
            id: data.id,
            status: data.status?data.status:"Ler",
            atualizacao: new Date().toLocaleDateString('pt-BR')
        }
    }
    static bookResponse(obj){
        return {
            id: obj.id,
            titulo: obj.titulo,
            publicacao: obj.publicacao,
            status: obj.status,
            atualizacao: obj.atualizacao
        }
    }
}
export default UserDTO;