import { NotFound } from './livros_autores.error.js'

class Service {
    constructor(repository) {
        this.repository = repository
    }

    async listar() {
        const response = await this.repository.listar()
        if (!response || response.length === 0) {
            // Boa prática: usando o AppError customizado que você criou!
            throw new NotFound()
        }
        return response
    }
}

export default Service
