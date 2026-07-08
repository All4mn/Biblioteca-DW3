import database from "../../config/config.js";

class Repository {
  async listar() {
    return (await database.query("select u.usuario_id,p.pessoa_id, p.nome, p.email, p.telefone, p.cpf, p.data_nascimento, u.ativo from usuarios_membros u JOIN pessoas p on u.pessoa_id = p.pessoa_id")).rows;
  }
  async findById(id) {
    const response = await database.query(
      `
  select u.usuario_id,u.pessoa_id, p.nome, p.email, p.telefone, p.cpf, p.data_nascimento, u.ativo from usuarios_membros u JOIN pessoas p on u.pessoa_id = p.pessoa_id where u.usuario_id = $1
  `,
      [id],
    );
    return response.rows[0];
  }

  

  async create(pessoa_id) {
    const response = await database.query(
      `
  INSERT INTO usuarios_membros (pessoa_id) VALUES ($1) RETURNING *
  `,
      [pessoa_id],
    );
    return response.rows[0];
  }

  async findByIdPessoa(pessoa_id){
  const response = await database.query(`
  SELECT * FROM pessoas WHERE pessoa_id = $1
  `,[pessoa_id]);
  return response.rows[0]
  }

  async findByPessoaIdInUsuario(pessoa_id){
  const response = await database.query(`
  select u.usuario_id,u.pessoa_id, p.nome, p.email, p.telefone, p.cpf, p.data_nascimento, u.ativo from usuarios_membros u JOIN pessoas p on u.pessoa_id = p.pessoa_id where u.pessoa_id = $1
  `,[pessoa_id]);
  return response.rows[0]
  }

  async listAllEmprestimos(Id){
  const response = await database.query(`
  SELECT u.usuario_id, p.nome, l.titulo, l.editora, e.data_emprestimo, e.data_devolucao_prevista, e.data_devolucao_real, e.status FROM usuarios_membros u INNER JOIN pessoas p ON u.pessoa_id = p.pessoa_id
  INNER JOIN emprestimos e ON e.usuario_id = u.usuario_id
  INNER JOIN livros l ON e.livro_id = l.livro_id
  where u.usuario_id = $1
  `,[Id]);
  return response.rows
  }

  async delete(id){
  const response = await database.query(`
    UPDATE usuarios_membros SET ativo = NOT ativo WHERE usuario_id = $1
    returning *
  `,[id]);
  return response.rows
  }
}

export default Repository;
