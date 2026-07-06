import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM categorias_generos")).rows
  }
}

export default Repository

