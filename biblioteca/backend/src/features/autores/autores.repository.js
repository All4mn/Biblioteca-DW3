import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM autores")).rows
  }
}

export default Repository

