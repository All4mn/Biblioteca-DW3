import Controller from './autores.controller.js';
import Repository from './autores.repository.js';
import Service from './autores.service.js';
import {
  autoresListResponseSchema,
  autorResponseSchema,
  autorIdParamSchema,
  createAutorBodySchema,
  updateAutorBodySchema
} from '../../schemas/autores.schema.js';

export default async function AutoresRoutes(app) {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  app.get('/', {
    schema: {
      tags: ['Autores'],
      summary: 'Listar autores',
      description: 'Retorna todos os autores cadastrados.',
      response: {
        200: autoresListResponseSchema
      }
    },
    handler: async (req, res) => controller.listar(req, res)
  });

  app.get('/:id', {
    schema: {
      tags: ['Autores'],
      summary: 'Buscar autor por ID',
      description: 'Retorna os dados do autor identificado pelo ID informado.',
      params: autorIdParamSchema,
      response: {
        200: autorResponseSchema
      }
    },
    handler: async (req, res) => controller.findById(req, res)
  });

  app.post('/', {
    schema: {
      tags: ['Autores'],
      summary: 'Criar autor',
      description: 'Registra um novo autor com nome e nacionalidade.',
      body: createAutorBodySchema,
      response: {
        200: autorResponseSchema
      }
    },
    handler: async (req, res) => controller.create(req, res)
  });

  app.put('/:id', {
    schema: {
      tags: ['Autores'],
      summary: 'Atualizar autor',
      description: 'Atualiza nome e nacionalidade do autor existente.',
      params: autorIdParamSchema,
      body: updateAutorBodySchema,
      response: {
        200: autorResponseSchema
      }
    },
    handler: async (req, res) => controller.update(req, res)
  });
}

