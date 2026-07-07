import Controller from './livros.controller.js';
import Repository from './livros.repository.js';
import Service from './livros.service.js';

export default async function LivrosRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)

    app.get('/', async (req, res) => controller.listar(req, res))
    app.get('/:id', async (req, res) => controller.findById(req, res))
    app.post('/', async (req, res) => controller.create(req, res))
    app.put('/:id', async (req, res) => controller.update(req, res))
}