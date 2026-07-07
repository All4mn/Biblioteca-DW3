import { NotFound, RequiredField } from "./usuarios.error.js";

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
    if (!id) throw new RequiredField("Id faltante");
    const response = await this.repository.findById(id);
    if (!response) throw new NotFound();
    return response;
  }

  async findByIdPessoa(id) {
    if (!id) throw new RequiredField("Id da pessoa faltando");
    console.log("passando no findbyidPessoa");
    
    const response = await this.repository.findByIdPessoa(id);
    if (!response) throw new NotFound("Pessoa não existente na tabela")
      return 
  }

  async create(pessoa_id) {
    if (!pessoa_id) throw new RequiredField("Usuario_id faltante");
    const existente = await this.repository.findByIdPessoa(pessoa_id);
    if (!existente) throw new NotFound("Pessoa não encontrada");
    const response = await this.repository.create(pessoa_id);
    return response;
  }

  async findByPessoaIdInUsuario(pessoa_id) {
    console.log("passando no findbyidPessoa");
    await  this.findByIdPessoa(pessoa_id);
    if (!pessoa_id || isNaN(pessoa_id)) throw new RequiredField("Pessoa não cadastrada como membro");
    const response = await this.repository.findByPessoaIdInUsuario(pessoa_id);
    return response;
  }
}

export default Service;
