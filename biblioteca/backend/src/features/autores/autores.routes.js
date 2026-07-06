import Controller from './autores.controller.js';
import Repository from './autores.repository.js';
import Service from './autores.service.js';

export default async function AutoresRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/', async (req, res) => {
        return controller.listar(req, res)
    })
}
