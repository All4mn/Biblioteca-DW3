class Controller {
    constructor(service) {
        this.service = service
    }

    async listar(req, res) {
        // Deixamos o erro subir para o Error Handler Global resolver de forma limpa
        const response = await this.service.listar()
        return res.send({ status: 'OK', data: response })
    }
    async findById(req, res){
        const {id} = req.params
        const response = await this.service.findById(id);
        return response;
    }
}

export default Controller

