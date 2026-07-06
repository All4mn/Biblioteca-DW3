import { AppError } from "../../errors/AppError.js";
import { NotFound, RequiredField } from "./autores.error.js";

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async listar() {
    const response = await this.repository.listar();
    if (!response || response.length === 0) {
      // Boa prática: usando o AppError customizado que você criou!
      throw new NotFound();
    }
    return response;
  }
  async findById(id) {
    if (!id || isNaN(id)) throw new RequiredField("Id inválido ou inexistente");
    const response = await this.repository.findById(id);
    if (!response) throw new NotFound("Id de autor não existente");
    return response;
  }

  async create(nome, nacionalidade) {
    let erros = [];
    if (!nome) erros.push("Nome não especificado");
    else if (nome.trim() === "") erros.push("Nome inválido");
    if (!nacionalidade) erros.push("Nacionalidade não especificada");
    if (erros.length > 0) throw new RequiredField(erros);
    try {
        const response = await this.repository.create(nome, nacionalidade);
        return response;
        
    } catch (error) {
        if(error.code === '23505'){            
            throw new AppError("Conflito de inserção: Nomes duplicados")
        }
        throw new AppError("Incapaz de cadastrar novo autor")
    }
  }
}

export default Service;
