import TarefaController from "./tarefas.controller.js";
import TarefaRepository from "./tarefas.repository.js";
import TarefaService from "./tarefas.service.js";

export default async function TarefaRoutes(app) {
    const repository = new TarefaRepository()
    const service = new TarefaService(repository)
    const controller = new TarefaController(service)
    
    app.get('/tarefas', async (req, res) => {
        return controller.listar(req, res)
    })
}
