class normalize{// serve para remover os caracteres indesejados que estão selecionados
    static Titulo(text){
        return text
            .replace(/[_\-~^<>|]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }
    static Nome(text){
        return text
            .replave(/[_\-~^<>|/]/g, " ")
            .replace(/[^a-zA-ZÀ-ÿ]/g,"")
            .replace(/\s+/g," ")
            .trim()
    }
}
export default normalize;