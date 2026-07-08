import Controller from './livros.controller.js';
import Repository from './livros.repository.js';
import Service from './livros.service.js';
import {
  livrosListResponseSchema,
  livroResponseSchema,
  createLivroBodySchema,
  updateLivroBodySchema,
  livroIdParamSchema
} from '../../schemas/livros.schema.js';

export default async function LivrosRoutes(app) {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  app.get('/', {
    schema: {
      tags: ['Livros'],
      summary: 'Listar livros',
      description: 'Retorna todos os livros cadastrados.',
      response: {
        200: livrosListResponseSchema
      }
    },
    handler: async (req, res) => controller.listar(req, res)
  });

  app.get('/:id', {
    schema: {
      tags: ['Livros'],
      summary: 'Buscar livro por ID',
      description: 'Retorna os dados do livro identificado pelo ID informado.',
      params: livroIdParamSchema,
      response: {
        200: livroResponseSchema
      }
    },
    handler: async (req, res) => controller.findById(req, res)
  });

  app.post('/', {
    schema: {
      tags: ['Livros'],
      summary: 'Criar livro',
      description: 'Registra um novo livro com categoria associada.',
      body: createLivroBodySchema,
      response: {
        200: livroResponseSchema
      }
    },
    handler: async (req, res) => controller.create(req, res)
  });

  app.put('/:id', {
    schema: {
      tags: ['Livros'],
      summary: 'Atualizar livro',
      description: 'Atualiza os dados de um livro existente.',
      params: livroIdParamSchema,
      body: updateLivroBodySchema,
      response: {
        200: livroResponseSchema
      }
    },
    handler: async (req, res) => controller.update(req, res)
  });
}