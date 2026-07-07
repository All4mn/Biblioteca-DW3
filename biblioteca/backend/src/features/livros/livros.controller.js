class Controller {
    constructor(service) {
        this.service = service
    }

    async listar(req, res) {
        const response = await this.service.listar()
        return res.send({ status: 'OK', data: response })
    }

    async findById(req, res) {
        const { id } = req.params
        const response = await this.service.findById(id)
        return response
    }

    async create(req, res) {
        const { titulo, isbn, ano_publicacao, editora, categoria_id } = req.body
        const response = await this.service.create(titulo, isbn, ano_publicacao, editora, categoria_id)
        return response
    }

    async update(req, res) {
        const { id } = req.params
        const { titulo, isbn, ano_publicacao, editora, categoria_id } = req.body
        const response = await this.service.update(id, titulo, isbn, ano_publicacao, editora, categoria_id)
        return response
    }
}

export default Controller

