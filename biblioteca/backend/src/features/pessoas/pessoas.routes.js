import Controller from './pessoas.controller.js';
import Repository from './pessoas.repository.js';
import Service from './pessoas.service.js';

export default async function PessoasRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/', async (req, res) => {
        return controller.listar(req, res)
    })
}
