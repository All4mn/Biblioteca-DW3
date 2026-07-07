import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM livros")).rows
    }

    async findById(id) {
        const response = await database.query(
            'SELECT * FROM livros WHERE livro_id = $1',
            [id]
        )
        return response.rows[0]
    }

    async create(titulo, isbn, ano_publicacao, editora, categoria_id) {
        const response = await database.query(
            'INSERT INTO livros (titulo, isbn, ano_publicacao, editora, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [titulo, isbn, ano_publicacao, editora, categoria_id]
        )
        return response.rows
    }

    async update(id, titulo, isbn, ano_publicacao, editora, categoria_id) {
        const response = await database.query(
            `UPDATE livros SET
                titulo = COALESCE($1, titulo),
                isbn = COALESCE($2, isbn),
                ano_publicacao = COALESCE($3, ano_publicacao),
                editora = COALESCE($4, editora),
                categoria_id = COALESCE($5, categoria_id)
            WHERE livro_id = $6 RETURNING *`,
            [titulo, isbn, ano_publicacao, editora, categoria_id, id]
        )
        return response.rows
    }
}

export default Repository

