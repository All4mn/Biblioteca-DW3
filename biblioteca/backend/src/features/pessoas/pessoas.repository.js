import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM pessoas")).rows
  }

  async findById(id) {
    return (await database.query("SELECT * FROM pessoas WHERE pessoa_id = $1", [id])).rows[0]
  }
}

export default Repository

