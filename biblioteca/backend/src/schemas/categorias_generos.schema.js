export const categoriaGeneroResponseSchema = {
  type: 'object',
  properties: {
    categoria_id: { type: 'integer' },
    nome: { type: 'string' },
    descricao: { type: 'string' }
  },
  required: ['categoria_id', 'nome']
};

export const categoriasGenerosListResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    data: { type: 'array', items: categoriaGeneroResponseSchema }
  },
  required: ['status', 'data']
};

export const createCategoriaGeneroBodySchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    descricao: { type: 'string' }
  },
  required: ['nome', 'descricao']
};

export const updateCategoriaGeneroBodySchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    descricao: { type: 'string' }
  },
  required: ['nome', 'descricao']
};

export const categoriaGeneroIdParamSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Identificador da categoria ou gênero.' }
  },
  required: ['id']
};