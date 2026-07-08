import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("select p.nome, p.telefone, p.email, p.cpf, l.titulo, l.editora, e.data_emprestimo, e.data_devolucao_prevista, e.data_devolucao_real, e.status from emprestimos e INNER JOIN livros l ON l.livro_id = e.livro_id INNER JOIN usuarios_membros u ON u.usuario_id = e.usuario_id INNER JOIN pessoas p ON p.pessoa_id = u.pessoa_id")).rows
  }

  async findById(id){
  const response = await database.query(`
  select p.nome, p.telefone, p.email, p.cpf, l.titulo, l.editora, e.data_emprestimo, e.data_devolucao_prevista, e.data_devolucao_real, e.status from emprestimos e INNER JOIN livros l ON l.livro_id = e.livro_id INNER JOIN usuarios_membros u ON u.usuario_id = e.usuario_id INNER JOIN pessoas p ON p.pessoa_id = u.pessoa_id where e.emprestimo_id = $1
  `,[id]);
  return response.rows
  }

  async emprestarLivro(req){
  const response = await database.query(`
  INSERT INTO emprestimos (usuario_id, livro_id, funcionario_id, data_emprestimo, data_devolucao_prevista, status) VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE + 7, 'em_andamento' )
  returning *
  `,[req.usuario_id, req.livro_id, req.funcionario_id]);
  return response.rows
  }
}

export default Repository

