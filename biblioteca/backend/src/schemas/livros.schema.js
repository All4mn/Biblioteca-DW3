export const livroResponseSchema = {
  type: 'object',
  properties: {
    livro_id: { type: 'integer' },
    titulo: { type: 'string' },
    isbn: { type: 'string' },
    ano_publicacao: { type: 'integer' },
    editora: { type: 'string' },
    categoria_id: { type: 'integer' }
  },
  required: ['livro_id', 'titulo', 'isbn', 'ano_publicacao', 'editora', 'categoria_id']
};

export const livrosListResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    data: { type: 'array', items: livroResponseSchema }
  },
  required: ['status', 'data']
};

export const createLivroBodySchema = {
  type: 'object',
  properties: {
    titulo: { type: 'string' },
    isbn: { type: 'string' },
    ano_publicacao: { type: 'integer' },
    editora: { type: 'string' },
    categoria_id: { type: 'integer' }
  },
  required: ['titulo', 'isbn', 'ano_publicacao', 'editora', 'categoria_id']
};

export const updateLivroBodySchema = {
  type: 'object',
  properties: {
    titulo: { type: 'string' },
    isbn: { type: 'string' },
    ano_publicacao: { type: 'integer' },
    editora: { type: 'string' },
    categoria_id: { type: 'integer' }
  },
  required: ['titulo', 'isbn', 'ano_publicacao', 'editora', 'categoria_id']
};

export const livroIdParamSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Identificador do livro.' }
  },
  required: ['id']
};