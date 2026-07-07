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
        const { nome, descricao } = req.body
        const response = await this.service.create(nome, descricao)
        return response
    }

    async update(req, res) {
        const { id } = req.params
        const { nome, descricao } = req.body
        const response = await this.service.update(id, nome, descricao)
        return response
    }
}

export default Controller

