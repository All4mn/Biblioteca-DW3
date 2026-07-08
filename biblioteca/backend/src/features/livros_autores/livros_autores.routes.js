import Controller from './livros_autores.controller.js';
import Repository from './livros_autores.repository.js';
import Service from './livros_autores.service.js';
import {
  livroAutorResponseSchema,
  livrosAutoresListResponseSchema,
  livrosAutoresByLivroResponseSchema,
  livrosAutoresByAutorResponseSchema,
  livroAutorIdParamSchema,
  criarLivroAutorBodySchema
} from '../../schemas/livros_autores.schema.js';

export default async function Livros_autoresRoutes(app) {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  app.get('/', {
    schema: {
      tags: ['LivrosAutores'],
      summary: 'Listar relacionamentos livro-autor',
      description: 'Retorna todos os registros de associação entre livros e autores.',
      response: {
        200: livrosAutoresListResponseSchema
      }
    },
    handler: async (req, res) => controller.listar(req, res)
  });

  app.get('/livro/:id', {
    schema: {
      tags: ['LivrosAutores'],
      summary: 'Buscar autores por livro',
      description: 'Retorna as relações de autores para o livro informado.',
      params: livroAutorIdParamSchema,
      response: {
        200: livrosAutoresByLivroResponseSchema
      }
    },
    handler: async (req, res) => controller.findByIdLivro(req, res)
  });

  app.get('/autor/:id', {
    schema: {
      tags: ['LivrosAutores'],
      summary: 'Buscar livros por autor',
      description: 'Retorna as relações de livros para o autor informado.',
      params: livroAutorIdParamSchema,
      response: {
        200: livrosAutoresByAutorResponseSchema
      }
    },
    handler: async (req, res) => controller.findByIdAutor(req, res)
  });

  app.post('/', {
    schema: {
      tags: ['LivrosAutores'],
      summary: 'Criar relacionamento livro-autor',
      description: 'Associa um autor a um livro criando um novo registro de relacionamento.',
      body: criarLivroAutorBodySchema,
      response: {
        200: livroAutorResponseSchema
      }
    },
    handler: async (req, res) => controller.create(req, res)
  });
}