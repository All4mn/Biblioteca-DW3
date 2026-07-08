import { AppError } from "../../errors/AppError.js";

export class NotFound extends AppError{
    constructor(message = "Empréstimo não encontrado"){
    super(message,404)
    }
}

export class RequiredField extends AppError {
    constructor(message="Campo obrigatório") {
        super(message,401)
    }
}
