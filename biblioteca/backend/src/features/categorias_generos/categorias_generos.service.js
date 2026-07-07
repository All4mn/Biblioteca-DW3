import { AppError } from "../../errors/AppError.js";
import { NotFound, RequiredField } from './categorias_generos.error.js'

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
        if (!response) throw new NotFound("Id de categoria/gênero não existente")
        return response
    }

    async create(nome, descricao) {
        let erros = [];
        if (!nome) erros.push("Nome não especificado")
        else if (nome.trim() === "") erros.push("Nome inválido")
        if (erros.length > 0) throw new RequiredField(erros)
        try {
            const response = await this.repository.create(nome, descricao)
            return response
        } catch (error) {
            if (error.code === "23505") {
                throw new AppError("Conflito de inserção: Nomes duplicados")
            }
            throw new AppError("Incapaz de cadastrar nova categoria/gênero")
        }
    }

    async update(id, nome, descricao) {
        if (!id || isNaN(id)) throw new RequiredField("Id não especificado ou inválido")
        if (!nome && !descricao) throw new RequiredField("Ambos os campos não especificados")
        try {
            const response = await this.repository.update(id, nome, descricao)
            return response
        } catch (error) {
            if (!error.code === "23505") {
                throw new AppError("Conflito de atualização: Nomes Duplicados")
            }
            throw new AppError("Incapaz de atualizar")
        }
    }
}

export default Service
