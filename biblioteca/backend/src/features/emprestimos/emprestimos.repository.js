import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query(`
            SELECT e.emprestimo_id, p.nome, p.telefone, p.email, p.cpf,
                   l.titulo, l.editora,
                   e.data_emprestimo, e.data_devolucao_prevista,
                   e.data_devolucao_real, e.status,
                   pf.nome AS funcionario_nome
            FROM emprestimos e
            INNER JOIN livros l ON l.livro_id = e.livro_id
            INNER JOIN usuarios_membros u ON u.usuario_id = e.usuario_id
            INNER JOIN pessoas p ON p.pessoa_id = u.pessoa_id
            INNER JOIN funcionarios f ON f.funcionario_id = e.funcionario_id
            INNER JOIN pessoas pf ON pf.pessoa_id = f.pessoa_id
        `)).rows
    }

    async findById(id) {
        const response = await database.query(`
            SELECT e.emprestimo_id, p.nome, p.telefone, p.email, p.cpf,
                   l.titulo, l.editora,
                   e.data_emprestimo, e.data_devolucao_prevista,
                   e.data_devolucao_real, e.status,
                   pf.nome AS funcionario_nome
            FROM emprestimos e
            INNER JOIN livros l ON l.livro_id = e.livro_id
            INNER JOIN usuarios_membros u ON u.usuario_id = e.usuario_id
            INNER JOIN pessoas p ON p.pessoa_id = u.pessoa_id
            INNER JOIN funcionarios f ON f.funcionario_id = e.funcionario_id
            INNER JOIN pessoas pf ON pf.pessoa_id = f.pessoa_id
            WHERE e.emprestimo_id = $1
        `, [id])
        return response.rows[0]
    }

    async emprestarLivro(usuario_id, livro_id, funcionario_id) {
        const response = await database.query(`
            INSERT INTO emprestimos (usuario_id, livro_id, funcionario_id, data_emprestimo, data_devolucao_prevista, status)
            VALUES ($1, $2, $3, CURRENT_DATE, CURRENT_DATE + 7, 'em_andamento')
            RETURNING *
        `, [usuario_id, livro_id, funcionario_id])
        return response.rows
    }

    async devolver(id) {
        const response = await database.query(`
            UPDATE emprestimos
            SET data_devolucao_real = CURRENT_DATE, status = 'devolvido'
            WHERE emprestimo_id = $1
            RETURNING *
        `, [id])
        return response.rows[0]
    }

    async findUsuarioById(usuario_id) {
        const response = await database.query(`
            SELECT u.usuario_id, u.ativo, p.nome
            FROM usuarios_membros u
            INNER JOIN pessoas p ON p.pessoa_id = u.pessoa_id
            WHERE u.usuario_id = $1
        `, [usuario_id])
        return response.rows[0]
    }

    async findEmprestimoAtivoByLivroId(livro_id) {
        const response = await database.query(`
            SELECT emprestimo_id FROM emprestimos
            WHERE livro_id = $1 AND status IN ('em_andamento', 'atrasado')
            LIMIT 1
        `, [livro_id])
        return response.rows[0]
    }
}

export default Repository
