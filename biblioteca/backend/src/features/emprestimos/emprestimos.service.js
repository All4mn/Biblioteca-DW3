import { NotFound, RequiredField } from "./emprestimos.error.js";

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
    if (!id) throw new RequiredField();
    const response = await this.repository.findById(id);
    if (!response) throw new NotFound();
    return response;
  }
  async emprestarLivro(req){
    console.log(req);
    
  const response = await this.repository.emprestarLivro(req);
  return response;
  }
}

export default Service;
