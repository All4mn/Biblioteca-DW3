import database from '../../config/config.js'

class Repository {
    async listar() {
        return (await database.query("SELECT * FROM categorias_generos")).rows
    }

    async findById(id) {
        const response = await database.query(
            `SELECT * FROM categorias_generos WHERE categoria_id = $1`,
            [id]
        )
        return response.rows
    }

    async create(nome, descricao) {
        const response = await database.query(
            `INSERT INTO categorias_generos (nome, descricao) VALUES ($1, $2) RETURNING *`,
            [nome, descricao]
        )
        return response.rows
    }

    async update(id, nome, descricao) {
        const response = await database.query(
            `UPDATE categorias_generos SET nome = COALESCE($1, nome), descricao = COALESCE($2, descricao) WHERE categoria_id = $3 RETURNING *`,
            [nome, descricao, id]
        )
        return response.rows
    }
}

export default Repository

