export const livroAutorResponseSchema = {
  type: 'object',
  properties: {
    autor: { type: 'string' },
    autor_id: { type: 'integer' },
    livro_id: { type: 'integer' },
    titulo: { type: 'string' },
    genero: { type: 'string' },
    categoria_id: { type: 'integer' }
  },
  required: ['autor', 'autor_id', 'livro_id', 'titulo', 'genero', 'categoria_id']
};

export const livrosAutoresListResponseSchema = {
  type: 'array',
  items: livroAutorResponseSchema
};

export const livrosAutoresByLivroResponseSchema = {
  type: 'array',
  items: livroAutorResponseSchema
};

export const livrosAutoresByAutorResponseSchema = {
  type: 'array',
  items: livroAutorResponseSchema
};

export const livroAutorIdParamSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Identificador de livro ou autor usado na rota.' }
  },
  required: ['id']
};

export const criarLivroAutorBodySchema = {
  type: 'object',
  properties: {
    livro_id: { type: 'integer', description: 'Identificador do livro.' },
    autor_id: { type: 'integer', description: 'Identificador do autor.' }
  },
  required: ['livro_id', 'autor_id']
};
