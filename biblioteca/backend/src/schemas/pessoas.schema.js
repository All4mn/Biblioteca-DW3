export const pessoaResponseSchema = {
  type: 'object',
  properties: {
    pessoa_id: { type: 'integer' },
    nome: { type: 'string' },
    email: { type: 'string' },
    telefone: { type: 'string' },
    data_nascimento: { type: 'string', format: 'date' },
    cpf: { type: 'string' }
  },
  required: ['pessoa_id', 'nome', 'email', 'cpf']
};

export const pessoasListResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    data: { type: 'array', items: pessoaResponseSchema }
  },
  required: ['status', 'data']
};

export const createPessoaBodySchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    email: { type: 'string' },
    telefone: { type: 'string' },
    data_nascimento: { type: 'string', format: 'date' },
    cpf: { type: 'string' }
  },
  required: ['nome', 'email', 'telefone', 'data_nascimento', 'cpf']
};

export const updatePessoaBodySchema = {
  type: 'object',
  properties: {
    nome: { type: 'string' },
    telefone: { type: 'string' },
    data_nascimento: { type: 'string', format: 'date' }
  },
  required: ['nome', 'telefone', 'data_nascimento']
};

export const pessoaIdParamSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Identificador da pessoa.' }
  },
  required: ['id']
};