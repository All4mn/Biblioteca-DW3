import { NotFound, RequiredField } from "./emprestimos.error.js";
import { AppError } from "../../errors/AppError.js";

class Service {
  constructor(repository) {
    this.repository = repository;
  }

  async listar() {
    const response = await this.repository.listar();
    if (!response || response.length === 0) {
      throw new NotFound();
    }
    return response;
  }

  async findById(id) {
    if (!id || isNaN(id)) throw new RequiredField("Id inválido ou inexistente");
    const response = await this.repository.findById(id);
    if (!response) throw new NotFound("Empréstimo não encontrado");
    return response;
  }

  async emprestarLivro(usuario_id, livro_id, funcionario_id) {
    let errors = []
    if (!usuario_id || isNaN(usuario_id)) errors.push("Usuário inválido ou inexistente")
    if (!livro_id || isNaN(livro_id)) errors.push("Livro inválido ou inexistente")
    if (!funcionario_id || isNaN(funcionario_id)) errors.push("Funcionário inválido ou inexistente")
    if (errors.length > 0) throw new RequiredField(errors)

    try {
      const usuario = await this.repository.findUsuarioById(usuario_id)
      if (!usuario) throw new AppError("Usuário não encontrado. Verifique o id informado.")
      if (!usuario.ativo) throw new AppError("Usuário inativo. Não é possível realizar empréstimo.")

      const emprestimoAtivo = await this.repository.findEmprestimoAtivoByLivroId(livro_id)
      if (emprestimoAtivo) throw new AppError("Livro já está emprestado. Aguarde a devolução.")

      const response = await this.repository.emprestarLivro(usuario_id, livro_id, funcionario_id)
      return response
    } catch (error) {
      if (error instanceof AppError) throw error
      if (error.code === "23503") {
        throw new AppError("Usuário, livro ou funcionário não encontrado. Verifique os ids informados.")
      }
      throw new AppError("Incapaz de realizar empréstimo")
    }
  }

  async devolver(id) {
    if (!id || isNaN(id)) throw new RequiredField("Id inválido ou inexistente")
    const emprestimo = await this.repository.findById(id)
    if (!emprestimo) throw new NotFound("Empréstimo não encontrado")
    if (emprestimo.status === "devolvido") throw new AppError("Empréstimo já foi devolvido anteriormente")
    const response = await this.repository.devolver(id)
    return response
  }
}

export default Service;
