import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM usuarios_membros")).rows
  }
}

export default Repository

