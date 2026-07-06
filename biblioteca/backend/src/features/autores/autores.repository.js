import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM autores")).rows
  }

  async findById(id){
  const response = await database.query(`
  SELECT * FROM  autores WHERE autor_id = $1
  `,[id]);
  return response.rows
  }
  async create(nome,nacionalidade){
  const response = await database.query(`
  INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2)
  RETURNING * 
  `,[nome,nacionalidade]);
  return response.rows
  }
}

export default Repository

