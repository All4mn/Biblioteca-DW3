import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM funcionarios")).rows
  }

  async findById(funcionario_id){
    const response = await database.query(
        'SELECT * FROM funcionarios WHERE funcionario_id = $1',
        [funcionario_id] 
    )
    return response.rows[0]
}

    async create(pessoa_id, cargo, data_contratacao){
        const response = await database.query(
            'INSERT INTO funcionarios (pessoa_id, cargo, data_contratacao) VALUES ($1, $2, $3) RETURNING *',
            [pessoa_id, cargo, data_contratacao]
        )
        return response.rows
    }

    async update(funcionario_id, cargo){
        const response = await database.query(
            'UPDATE funcionarios SET cargo = COALESCE($1, cargo) WHERE funcionario_id = $2 RETURNING *',
            [cargo, funcionario_id]
        )
        return response.rows
    }
}

export default Repository

