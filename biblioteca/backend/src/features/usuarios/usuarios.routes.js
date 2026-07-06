import Controller from './usuarios.controller.js';
import Repository from './usuarios.repository.js';
import Service from './usuarios.service.js';

export default async function UsuariosRoutes(app) {
    const repository = new Repository()
    const service = new Service(repository)
    const controller = new Controller(service)
    
    app.get('/usuarios', async (req, res) => {
        
        return controller.listar(req, res)
    })
}
