import { NotFound, RequiredField } from './funcionarios.error.js'
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

    async findById(id){
        if (!id || isNaN(id)) throw new RequiredField("Id inválido ou inexistente");
        const response = await this.repository.findById(id);
        if (!response) throw new NotFound("Funcionário não encontrado");
        return response;
    }

    async create(pessoa_id, cargo, data_contratacao){
        let errors = []
        if (!pessoa_id || isNaN(pessoa_id)) errors.push("Id de pessoa inválido ou inexistente")
        if (!cargo) errors.push("Cargo não especificado")
        else if (cargo.trim() === "") errors.push("Cargo inválido")
        if (!data_contratacao) errors.push("Data de contratação não especificada")
        if (errors.length > 0) throw new RequiredField(errors)
        try {
            const response = await this.repository.create(pessoa_id, cargo, data_contratacao)
            return response
        } catch (error) {
            if (error.code === "23503") { //FK error para pessoa inexistente
                throw new AppError("Pessoa não encontrada. Verifique o pessoa_id informado.")
            }
            if (error.code === "23505") {
                throw new AppError("Funcionario já existe. Verifique o pessoa_id informado.")
            }
            throw new AppError("Incapaz de cadastrar novo funcionário")
        }
    }

    async update(id, cargo){
        if (!id || isNaN(id)) throw new RequiredField("Id não especificado ou inválido")
        if (!cargo) throw new RequiredField("Cargo não especificado")
        try {
            const response = await this.repository.update(id, cargo)
            return response
        } catch (error) {
            throw new AppError("Incapaz de atualizar funcionário")
        }
    }
}

export default Service
