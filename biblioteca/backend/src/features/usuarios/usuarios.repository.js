import database from "../../config/config.js";

class Repository {
  async listar() {
    return (await database.query("select u.usuario_id,p.pessoa_id, p.nome, p.email, p.telefone, p.cpf, p.data_nascimento from usuarios_membros u JOIN pessoas p on u.pessoa_id = p.pessoa_id")).rows;
  }
  async findById(id) {
    const response = await database.query(
      `
  select u.usuario_id,u.pessoa_id, p.nome, p.email, p.telefone, p.cpf, p.data_nascimento from usuarios_membros u JOIN pessoas p on u.pessoa_id = p.pessoa_id where u.usuario_id = $1
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
  select u.usuario_id,u.pessoa_id, p.nome, p.email, p.telefone, p.cpf, p.data_nascimento from usuarios_membros u JOIN pessoas p on u.pessoa_id = p.pessoa_id where u.pessoa_id = $1
  `,[pessoa_id]);
  return response.rows[0]
  }
}

export default Repository;
