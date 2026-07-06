import database from "../../config/config.js";

class Repository {
  async listar() {
    return (await database.query("SELECT * FROM livros_autores")).rows;
  }
async findByIdLivro(id){
const response = await database.query(`
SELECT * FROM livros_autores WHERE livro_id = $1
`,[id]);
return response.rows
}
  
async findByIdAutor(id){
const response = await database.query(`
SELECT * FROM livros_autores WHERE autor_id = $1
`,[id]);
return response.rows
}
}
export default Repository;
