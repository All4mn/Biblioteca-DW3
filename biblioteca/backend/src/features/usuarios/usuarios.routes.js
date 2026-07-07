import Controller from './usuarios.controller.js';
import Repository from './usuarios.repository.js';
import Service from './usuarios.service.js'

export default async function UsuariosRoutes(app) {
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
    return controller.create(req,res)
    })

    app.delete('/:id', async (req,res)=>{
    return controller.delete(req,res)
    })

    app.get('/pessoa/:id', async (req,res)=>{
    return controller.findByPessoaIdInUsuario(req,res)
    })
}
