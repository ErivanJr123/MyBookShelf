import { body, param } from "express-validator";

class Validator{
    static forLogin = [
        body("login")
            .notEmpty().withMessage("O campo login é obrigatório"),
        body("senha")
            .notEmpty().withMessage("O campo senha é obrigatório")
    ]
    static forCreate = [
        body("nome")
            .trim()
            .notEmpty().withMessage("O campo nome não pode estar vazio")
            .isLength({min:3}).withMessage("O nome deve conter pelo menos 3 caracteres"),
        body("email")
            .trim()
            .notEmpty().withMessage("O campo e-mail é obrigatório")
            .isEmail().withMessage("O e-mail é inválido"),
        body("login")
            .trim()
            .notEmpty().withMessage("O campo login é obrigatório"),
        body("senha")
            .trim()
            .notEmpty().withMessage("O campo senha é obrigatório")
            .isLength({min: 8}).withMessage("A senha precisa conter pelo menos 8 caracteres")
    ]
    static forId = [
        param("id")
            .trim()
            .notEmpty().withMessage("O ID é obrigatório")
            .isUUID(4).withMessage("O ID fornecido não é um UUIDv4 Válido")
    ]
    static forUpdate = [
        param("id")
            .trim()
            .notEmpty().withMessage("O ID é obrigatório")
            .isUUID(4).withMessage("O ID fornecido não é um UUIDv4 Válido"),
        body("nome")
            .trim()
            .optional({checkFalsy:true})
            .isLength({min:3}).withMessage("O nome deve conter pelo menos 3 caracteres"),
        body("email")
            .trim()
            .optional({checkFalsy:true})
            .isEmail().withMessage('Insira um formato de e-mail válido.')
            .normalizeEmail(),
        body('senha')
            .trim()
            .optional({checkFalsy:true})
            .isLength({ min: 8 }).withMessage('A nova senha deve conter pelo menos 8 caracteres.'),
        ]
    static forUpdateStatus = [
        param("id")
            .trim()
            .isUUID(4).withMessage("O ID do usuário fornecido não é um UUIDv4 Válido"),
        param("bookID")
            .trim()
            .isUUID(4).withMessage("O ID do Livro fornecido não é um UUIDv4 Válido"),
        body("status")
            .exists({checkFalsy: true}).withMessage("O campo status é obrigatório")
            .trim()
            .isIn(["Ler", "Lendo", "Lido"]).withMessage("O status precisa ser Ler, Lendo ou Lido")
    ]
    static forDelete = [
        param("id")
            .trim()
            .isUUID(4).withMessage("O ID do usuário fornecido não é um UUIDv4 Válido"),
        param("bookID")
            .trim()
            .isUUID(4).withMessage("O ID do Livro fornecido não é um UUIDv4 Válido")
    ]
}

export default Validator;