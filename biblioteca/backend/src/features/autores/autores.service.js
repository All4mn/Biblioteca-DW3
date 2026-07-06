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
    if(!response) throw new NotFound("Id de autor não existente")
    return response;
  }
}

export default Service;
