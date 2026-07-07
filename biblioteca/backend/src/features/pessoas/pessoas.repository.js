import database from '../../config/config.js'

class Repository {

  async listar() {
    return (await database.query("SELECT * FROM pessoas")).rows
  }

  async findById(id) {
    return (await database.query("SELECT * FROM pessoas WHERE pessoa_id = $1", [id])).rows[0]
  }

  async create(nome, email, telefone, data_nascimento, cpf) {
    return (await database.query(
      'INSERT INTO pessoas (nome, email, telefone, data_nascimento, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING * ',
      [nome, email, telefone, data_nascimento, cpf]
    )).rows;
  }

  async update(id, nome, telefone, data_nascimento){
    return (await database.query(
      'UPDATE pessoas SET nome = COALESCE($1, nome), telefone = COALESCE($2, telefone), data_nascimento = COALESCE($3, data_nascimento) WHERE pessoa_id = $4 RETURNING *',
      [nome, telefone, data_nascimento, id]
    )).rows;
  }
}

export default Repository

