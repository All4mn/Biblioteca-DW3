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
        const { pessoa_id, cargo, data_contratacao } = req.body
        const response = await this.service.create(pessoa_id, cargo, data_contratacao)
        return response
    }

    async update(req, res) {
        const { id } = req.params
        const { cargo } = req.body
        const response = await this.service.update(id, cargo)
        return response
    }
}

export default Controller

