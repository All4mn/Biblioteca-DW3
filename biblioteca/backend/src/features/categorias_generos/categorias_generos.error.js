import { AppError } from "../../errors/AppError.js";

export class NotFound extends AppError {
    constructor(message = "Response não encontrada") {
        super(message, 404)
    }
}

export class RequiredField extends AppError {
    constructor(message = "Campo obrigatório") {
        super(message, 401)
    }
}
