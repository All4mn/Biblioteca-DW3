import { NotFound, RequiredField } from './pessoas.error.js'
import { AppError } from '../../errors/AppError.js'

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

    async findById(id) {
        if(!id || isNaN(id)){
            throw new RequiredField('Id inválido ou inexistente')
        }
        const response = await this.repository.findById(id)
        if (!response) {
            throw new NotFound("Pessoa não encontrada")
        }
        return response
    }

    async create(nome, email, telefone, data_nascimento, cpf){
        // acredito que telefone e data_nascimento não precisam ser obrigatórios
        let erros = [];
        if (!nome) erros.push("Nome não especificado");
        else if (nome.trim() === "") erros.push("Nome inválido");
        if (!email) erros.push("Email não especificado");
        else if (email.trim() === "") erros.push("email inválido");
        if (!cpf) erros.push("CPF não especificado");
        else if (cpf.trim() === "" || cpf.length > 14) erros.push("CPF inválido");
        if (erros.length > 0) throw new RequiredField(erros);
        try {
            const response = await this.repository.create(nome, email, telefone, data_nascimento, cpf)
            return response
        } catch (error) {
            if (error.code === "23505") {
                throw new AppError("Conflito de inserção: Usuario já existente, email/cpf já cadastrados")
            }
            throw new AppError("Incapaz de cadastrar novo usuarios")
        }
    }

    async update(nome, telefone, data_nascimento, id) {
        // não faz sentido conseguir mudar email e CPF de uma maneira tão facil
    if(!id || isNaN(id)) throw new RequiredField("Id não especificado ou inválido")
    if(!nome && !telefone && !data_nascimento) throw new RequiredField("Nenhuma alteração realizada")
    
    try {
        const response = await this.repository.update(id, nome, telefone, data_nascimento);
        return response;
        
    } catch (error) {   
        throw new AppError("Incapaz de atualizar cadastro de pessoa");    
    }    
  }
}

export default Service
