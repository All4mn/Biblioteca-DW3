import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM funcionarios")).rows
  }
}

export default Repository

