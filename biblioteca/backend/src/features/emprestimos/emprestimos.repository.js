import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM emprestimos")).rows
  }
}

export default Repository

