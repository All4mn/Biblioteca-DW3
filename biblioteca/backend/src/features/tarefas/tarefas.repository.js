import database from '../../config/config.js'

class TarefaRepository {
    async listar() {
        return await database.query().rows
  }
}

export default TarefaRepository
