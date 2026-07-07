import Controller from './categorias_generos.controller.js';
import Repository from './categorias_generos.repository.js';
import Service from './categorias_generos.service.js';

export default async function Categorias_generosRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/', async (req, res) => controller.listar(req, res))
    app.get('/:id', async (req, res) => controller.findById(req, res))
    app.post('/', async (req, res) => controller.create(req, res))
    app.put('/:id', async (req, res) => controller.update(req, res))
}
