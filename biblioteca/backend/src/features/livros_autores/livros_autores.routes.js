import Controller from './livros_autores.controller.js';
import Repository from './livros_autores.repository.js';
import Service from './livros_autores.service.js';

export default async function Livros_autoresRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/', async (req, res) => {
        return controller.listar(req, res)
    })
    app.get('/livro/:id', async (req,res)=>{
    return controller.findByIdLivro(req,res)
    })
    
    app.get('/autor/:id', async (req,res)=>{
    return controller.findByIdAutor(req,res)
    })

    app.post('/', async (req,res)=>{
    return controller.create(req,res)
    })

}