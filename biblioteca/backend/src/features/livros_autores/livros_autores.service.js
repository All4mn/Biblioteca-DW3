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

    async create(livro_id, autor_id){
        if(!livro_id || !autor_id) throw new RequiredField()
            const repetido = await this.repository.findByIdLivro(livro_id)
        if(repetido.autor_id === autor_id) throw new RequiredField("Livro ja cadastrado")
    const response = await this.repository.create(livro_id, autor_id);
    return response;
    }
}

export default Service
