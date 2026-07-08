import Controller from './funcionarios.controller.js';
import Repository from './funcionarios.repository.js';
import Service from './funcionarios.service.js';
import {
  funcionariosListResponseSchema,
  funcionarioResponseSchema,
  createFuncionarioBodySchema,
  updateFuncionarioBodySchema,
  funcionarioIdParamSchema
} from '../../schemas/funcionarios.schema.js';

export default async function FuncionariosRoutes(app) {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  app.get('/', {
    schema: {
      tags: ['Funcionarios'],
      summary: 'Listar funcionários',
      description: 'Retorna todos os funcionários cadastrados.',
      response: {
        200: funcionariosListResponseSchema
      }
    },
    handler: async (req, res) => controller.listar(req, res)
  });

  app.get('/:id', {
    schema: {
      tags: ['Funcionarios'],
      summary: 'Buscar funcionário por ID',
      description: 'Retorna os dados do funcionário identificado pelo ID informado.',
      params: funcionarioIdParamSchema,
      response: {
        200: funcionarioResponseSchema
      }
    },
    handler: async (req, res) => controller.findById(req, res)
  });

  app.post('/', {
    schema: {
      tags: ['Funcionarios'],
      summary: 'Criar funcionário',
      description: 'Registra um novo funcionário vinculado a uma pessoa.',
      body: createFuncionarioBodySchema,
      response: {
        200: funcionarioResponseSchema
      }
    },
    handler: async (req, res) => controller.create(req, res)
  });

  app.put('/:id', {
    schema: {
      tags: ['Funcionarios'],
      summary: 'Atualizar funcionário',
      description: 'Atualiza o cargo do funcionário identificado.',
      params: funcionarioIdParamSchema,
      body: updateFuncionarioBodySchema,
      response: {
        200: funcionarioResponseSchema
      }
    },
    handler: async (req, res) => controller.update(req, res)
  });
}
