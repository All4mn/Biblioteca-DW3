import { NotFound, RequiredField } from './livros_autores.error.js'

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

    async findByIdLivro(id){
        if(!id || isNaN(id)) throw new RequiredField("Id inválido ou não especificado") 
    const response = await this.repository.findByIdLivro(id);
    if(!response){
        throw new NotFound()
    }
    return response;
    }
    async findByIdAutor(id){
        if(!id || isNaN(id)) throw new RequiredField("Id inválido ou não especificado") 
    const response = await this.repository.findByIdAutor(id);
    if(!response){
        throw new NotFound()
    }
    return response;
    }
}

export default Service
