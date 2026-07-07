import Controller from './pessoas.controller.js';
import Repository from './pessoas.repository.js';
import Service from './pessoas.service.js';

export default async function PessoasRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/', async (req, res) => controller.listar(req, res))
    app.get('/:id', async (req, res) => controller.findById(req, res))
    app.post('/', async (req, res) => controller.create(req, res))
    app.put('/:id', async (req, res) => controller.update(req, res))
}
