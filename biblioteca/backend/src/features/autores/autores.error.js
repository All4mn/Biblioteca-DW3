import { AppError } from "../../errors/AppError.js";

export class NotFound extends AppError{
    constructor(){
    super("Response não encontrada",404)
    }
}


export class RequiredField extends AppError {
    constructor(message="Campo obrigatório") {
        super(message,401)
    }
}

//tenha a liberdade de escrever novos erros para esta aplicação, ex: Erro de validação, erro pra submitar, etc
