import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM pessoas")).rows
  }
}

export default Repository

