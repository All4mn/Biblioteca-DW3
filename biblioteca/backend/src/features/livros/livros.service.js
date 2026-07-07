import { NotFound, RequiredField } from './livros.error.js'
import { AppError } from '../../errors/AppError.js'

class Service {
    constructor(repository) {
        this.repository = repository
    }

    async listar() {
        const response = await this.repository.listar()
        if (!response || response.length === 0) {
            throw new NotFound()
        }
        return response
    }

    async findById(id) {
        if (!id || isNaN(id)) throw new RequiredField("Id inválido ou inexistente")
        const response = await this.repository.findById(id)
        if (!response) throw new NotFound("Livro não encontrado")
        return response
    }

    async create(titulo, isbn, ano_publicacao, editora, categoria_id) {
        let errors = []
        if (!titulo) errors.push("Título não especificado")
        else if (titulo.trim() === "") errors.push("Título inválido")
        if (!isbn) errors.push("ISBN não especificado")
        else if (isbn.trim() === "") errors.push("ISBN inválido")
        if (!categoria_id || isNaN(categoria_id)) errors.push("Categoria inválida ou inexistente")
        if (errors.length > 0) throw new RequiredField(errors)
        try {
            const response = await this.repository.create(titulo, isbn, ano_publicacao, editora, categoria_id)
            return response
        } catch (error) {
            if (error.code === "23503") {
                throw new AppError("Categoria não encontrada. Verifique o categoria_id informado.")
            }
            if (error.code === "23505") {
                throw new AppError("Conflito de inserção: ISBN já cadastrado")
            }
            throw new AppError("Incapaz de cadastrar novo livro")
        }
    }

    async update(id, titulo, isbn, ano_publicacao, editora, categoria_id) {
        if (!id || isNaN(id)) throw new RequiredField("Id não especificado ou inválido")
        if (!titulo && !isbn && !ano_publicacao && !editora && !categoria_id) {
            throw new RequiredField("Nenhum campo para atualizar")
        }
        try {
            const response = await this.repository.update(id, titulo, isbn, ano_publicacao, editora, categoria_id)
            return response
        } catch (error) {
            if (error.code === "23503") {
                throw new AppError("Categoria não encontrada. Verifique o categoria_id informado.")
            }
            if (error.code === "23505") {
                throw new AppError("Conflito de atualização: ISBN já cadastrado")
            }
            throw new AppError("Incapaz de atualizar livro")
        }
    }
}

export default Service
