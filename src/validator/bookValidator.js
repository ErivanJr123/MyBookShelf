import { body,param } from "express-validator";

class Validator{
    static forGetID = [
        param("id")
            .isUUID(4)
            .withMessage("ID inválido")
    ];
    static forCreate = [
        body("titulo")
            .trim()
            .notEmpty().withMessage("Titulo obrigatório")
            .isLength({min:3}).withMessage("o titulo precisa conter no mínimo 3 letras"),

        body("publicacao")
            .trim()
            .notEmpty().withMessage("Ano de publicação obrigatório")
            .isInt().withMessage("Ano de publicação inválido")
            .toInt(),

        body("exemplar")
            .customSanitizer(V => {
                if(V === undefined || V === null || V === "") return null;
                const num = Number(V);
                return num!==num?null:num;
            })
            .optional()
            .isInt({min:1}).withMessage("Se enviado, o Número de exemplares precisa ser no mínimo 1"),

        body("autorID")
            .trim()
            .notEmpty().withMessage("ID do autor é obrigatório")
            .isUUID().withMessage("ID inválido")
    ];
    static forUpdate = [
        param("id")
            .isUUID(4)
            .withMessage("ID inválido"),
        body("titulo")
            .trim()
            .optional({checkFalsy: true}),
        body("publicacao")
            .trim()
            .optional({checkFalsy: true})
            .toInt(),
        body("exemplar")
            .trim()
            .optional({checkFalsy: true})
            .toInt()
            .isInt({min: 0, max: 5000000010}).withMessage("O número de exemplares precisa ser um número inteiro maior ou igual a 0")
    ];
    static forDelete = [
        param("id")
            .isUUID(4)
            .withMessage("ID inválido")
    ];
};

export default Validator;