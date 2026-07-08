import Controller from './categorias_generos.controller.js';
import Repository from './categorias_generos.repository.js';
import Service from './categorias_generos.service.js';
import {
  categoriasGenerosListResponseSchema,
  categoriaGeneroResponseSchema,
  categoriaGeneroIdParamSchema,
  createCategoriaGeneroBodySchema,
  updateCategoriaGeneroBodySchema
} from '../../schemas/categorias_generos.schema.js';

export default async function Categorias_generosRoutes(app) {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);

  app.get('/', {
    schema: {
      tags: ['CategoriasGenero'],
      summary: 'Listar categorias e gêneros',
      description: 'Retorna todas as categorias e gêneros cadastrados.',
      response: {
        200: categoriasGenerosListResponseSchema
      }
    },
    handler: async (req, res) => controller.listar(req, res)
  });

  app.get('/:id', {
    schema: {
      tags: ['CategoriasGenero'],
      summary: 'Buscar categoria/gênero por ID',
      description: 'Retorna a categoria/gênero identificada pelo ID informado.',
      params: categoriaGeneroIdParamSchema,
      response: {
        200: categoriaGeneroResponseSchema
      }
    },
    handler: async (req, res) => controller.findById(req, res)
  });

  app.post('/', {
    schema: {
      tags: ['CategoriasGenero'],
      summary: 'Criar categoria/gênero',
      description: 'Cadastra uma nova categoria ou gênero.',
      body: createCategoriaGeneroBodySchema,
      response: {
        200: categoriaGeneroResponseSchema
      }
    },
    handler: async (req, res) => controller.create(req, res)
  });

  app.put('/:id', {
    schema: {
      tags: ['CategoriasGenero'],
      summary: 'Atualizar categoria/gênero',
      description: 'Atualiza nome e descrição de uma categoria ou gênero existente.',
      params: categoriaGeneroIdParamSchema,
      body: updateCategoriaGeneroBodySchema,
      response: {
        200: categoriaGeneroResponseSchema
      }
    },
    handler: async (req, res) => controller.update(req, res)
  });
}
