import database from "../../config/config.js";

class Repository {
  async listar() {
    return (await database.query("select a.nome as autor, la.autor_id ,la.livro_id, l.titulo, cg.nome as genero, l.categoria_id  from public.livros_autores la inner  join public.autores a on a.autor_id = la.autor_id  inner join public.livros l on l.livro_id = la.livro_id inner join public.categorias_generos cg on l.categoria_id = cg.categoria_id")).rows;
  }
async findByIdLivro(id){
const response = await database.query(`
select a.nome as autor, la.autor_id ,la.livro_id, l.titulo, cg.nome as genero, l.categoria_id  from public.livros_autores la inner  join public.autores a on a.autor_id = la.autor_id  inner join public.livros l on l.livro_id = la.livro_id inner join public.categorias_generos cg on l.categoria_id = cg.categoria_id where la.livro_id = $1
`,[id]);
return response.rows
}
  
async findByIdAutor(id){
const response = await database.query(`
select a.nome as autor, la.autor_id ,la.livro_id, l.titulo, cg.nome as genero, l.categoria_id  from public.livros_autores la inner  join public.autores a on a.autor_id = la.autor_id  inner join public.livros l on l.livro_id = la.livro_id inner join public.categorias_generos cg on l.categoria_id = cg.categoria_id where la.autor_id = $1
`,[id]);
return response.rows
}

async create(livro_id, autor_id){
const response = await database.query(`
INSERT INTO livros_autores (livro_id, autor_id) VALUES ($1, $2)
returning *
`,[livro_id, autor_id]);
return response.rows
}
}
export default Repository;
