import Controller from './emprestimos.controller.js';
import Repository from './emprestimos.repository.js';
import Service from './emprestimos.service.js';
import {
  emprestimosListResponseSchema,
  emprestimoResponseSchema,
  emprestarLivroBodySchema,
  emprestimoIdParamSchema
} from '../../schemas/emprestimos.schema.js';

export default async function EmprestimosRoutes(app) {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  app.get('/', {
    schema: {
      tags: ['Emprestimos'],
      summary: 'Listar empréstimos',
      description: 'Retorna todos os empréstimos registrados na biblioteca.',
      response: {
        200: emprestimosListResponseSchema
      }
    },
    handler: async (req, res) => controller.listar(req, res)
  });

  app.get('/:id', {
    schema: {
      tags: ['Emprestimos'],
      summary: 'Buscar empréstimo por ID',
      description: 'Retorna os detalhes de um empréstimo específico.',
      params: emprestimoIdParamSchema,
      response: {
        200: emprestimoResponseSchema
      }
    },
    handler: async (req, res) => controller.findById(req, res)
  });

  app.post('/', {
    schema: {
      tags: ['Emprestimos'],
      summary: 'Registrar empréstimo',
      description: 'Cria um novo empréstimo para usuário, livro e funcionário especificados.',
      body: emprestarLivroBodySchema,
      response: {
        200: emprestimoResponseSchema
      }
    },
    handler: async (req, res) => controller.emprestarLivro(req, res)
  });
}
