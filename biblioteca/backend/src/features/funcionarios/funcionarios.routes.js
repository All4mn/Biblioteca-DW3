import Controller from './funcionarios.controller.js';
import Repository from './funcionarios.repository.js';
import Service from './funcionarios.service.js';

export default async function FuncionariosRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/', async (req, res) => controller.listar(req, res))
    app.get('/:id', async (req, res) => controller.findById(req, res))
    app.post('/', async (req, res) => controller.create(req, res))
    app.put('/:id', async (req, res) => controller.update(req, res))
}
