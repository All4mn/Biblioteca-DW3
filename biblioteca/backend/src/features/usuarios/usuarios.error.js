import { AppError } from "../../errors/AppError.js";

export class NotFound extends AppError{
    constructor(message="Response não encontrada"){
    super(message,404)
    }
}

export class RequiredField extends AppError {
    constructor(message="Campo Indefinido") {
        super(message,404)
    }
    
}

//tenha a liberdade de escrever novos erros para esta aplicação, ex: Erro de validação, erro pra submitar, etc
