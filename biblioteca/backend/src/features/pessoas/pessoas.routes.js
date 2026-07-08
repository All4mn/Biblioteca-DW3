import Controller from './pessoas.controller.js';
import Repository from './pessoas.repository.js';
import Service from './pessoas.service.js';
import {
  pessoasListResponseSchema,
  pessoaResponseSchema,
  createPessoaBodySchema,
  updatePessoaBodySchema,
  pessoaIdParamSchema
} from '../../schemas/pessoas.schema.js';

export default async function PessoasRoutes(app) {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  app.get('/', {
    schema: {
      tags: ['Pessoas'],
      summary: 'Listar pessoas',
      description: 'Retorna todas as pessoas registradas no sistema.',
      response: {
        200: pessoasListResponseSchema
      }
    },
    handler: async (req, res) => controller.listar(req, res)
  });

  app.get('/:id', {
    schema: {
      tags: ['Pessoas'],
      summary: 'Buscar pessoa por ID',
      description: 'Retorna os dados da pessoa identificada pelo ID informado.',
      params: pessoaIdParamSchema,
      response: {
        200: pessoaResponseSchema
      }
    },
    handler: async (req, res) => controller.findById(req, res)
  });

  app.post('/', {
    schema: {
      tags: ['Pessoas'],
      summary: 'Criar pessoa',
      description: 'Cadastra uma nova pessoa no sistema.',
      body: createPessoaBodySchema,
      response: {
        200: pessoaResponseSchema
      }
    },
    handler: async (req, res) => controller.create(req, res)
  });

  app.put('/:id', {
    schema: {
      tags: ['Pessoas'],
      summary: 'Atualizar pessoa',
      description: 'Atualiza nome, telefone e data de nascimento de uma pessoa existente.',
      params: pessoaIdParamSchema,
      body: updatePessoaBodySchema,
      response: {
        200: pessoaResponseSchema
      }
    },
    handler: async (req, res) => controller.update(req, res)
  });
}
