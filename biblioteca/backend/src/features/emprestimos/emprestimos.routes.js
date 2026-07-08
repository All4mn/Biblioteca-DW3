import Controller from './emprestimos.controller.js';
import Repository from './emprestimos.repository.js';
import Service from './emprestimos.service.js';

export default async function EmprestimosRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/', async (req, res) => {
        return controller.listar(req, res)
    })

    app.get('/:id', async (req,res)=>{
    return controller.findById(req,res)
    })

    app.post('/', async (req,res)=>{
    return controller.emprestarLivro(req,res)
    })
}
