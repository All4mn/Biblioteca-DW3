class Controller {
    constructor(service) {
        this.service = service
    }

    async listar(req, res) {
        // Deixamos o erro subir para o Error Handler Global resolver de forma limpa
        const response = await this.service.listar()
        return res.send({ status: 'OK', data: response })
    }

    async findById(req, res) {
        const { id } = req.params
        const response = await this.service.findById(id)
        return res.send({ status: 'OK', data: response })
    }
    
    async create(req, res){
        const {nome, email, telefone, data_nascimento, cpf} = req.body
        const response = await this.service.create(nome, email, telefone, data_nascimento, cpf)
        return response
    }

    async update(req, res){
        const {id} = req.params
        const {nome, telefone, data_nascimento} = req.body
        const response = await this.service.update(nome, telefone, data_nascimento, id)
        return response
    }
}

export default Controller

