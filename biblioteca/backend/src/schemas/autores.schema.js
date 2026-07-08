export const autorResponseSchema = {
  type: 'object',
  properties: {
    autor_id: { type: 'integer' },
    nome: { type: 'string' },
    nacionalidade: { type: 'string' }
  },
  required: ['autor_id', 'nome']
};

export const autoresListResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    data: { type: 'array', items: autorResponseSchema }
  },
  required: ['status', 'data']
};

export const createAutorBodySchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    nacionalidade: { type: 'string' }
  },
  required: ['nome', 'nacionalidade']
};

export const updateAutorBodySchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    nacionalidade: { type: 'string' }
  },
  required: ['nome', 'nacionalidade']
};

export const autorIdParamSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Identificador do autor.' }
  },
  required: ['id']
};