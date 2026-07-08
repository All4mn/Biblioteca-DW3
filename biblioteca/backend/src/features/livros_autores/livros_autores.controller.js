class Controller {
    constructor(service) {
        this.service = service
    }

    async listar(req, res) {
        // Deixamos o erro subir para o Error Handler Global resolver de forma limpa
        const response = await this.service.listar()
        return res.send({ status: 'OK', data: response })
    }
    async findByIdLivro(req, res){
        const {id} = req.params
        const response = await this.service.findByIdLivro(id);
    return response;
    }
    async findByIdAutor(req, res){
        const {id} = req.params
        const response = await this.service.findByIdAutor(id);
    return response;
    }

    async create(req, res){
        const { livro_id, autor_id } = req.body
    const response = await this.service.create(livro_id,autor_id);
    return response;
    }
}

export default Controller

