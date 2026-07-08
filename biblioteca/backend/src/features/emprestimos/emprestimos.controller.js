class Controller {
  constructor(service) {
    this.service = service;
  }

  async listar(req, res) {
    const response = await this.service.listar();
    return res.send({ status: "OK", data: response });
  }

  async findById(req, res) {
    const { id } = req.params;
    const response = await this.service.findById(id);
    return response;
  }

  async emprestarLivro(req, res) {
    const { usuario_id, livro_id, funcionario_id } = req.body;
    const response = await this.service.emprestarLivro(usuario_id, livro_id, funcionario_id);
    return response;
  }

  async devolver(req, res) {
    const { id } = req.params;
    const response = await this.service.devolver(id);
    return response;
  }
}

export default Controller;
