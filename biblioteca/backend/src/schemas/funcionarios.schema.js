export const funcionarioResponseSchema = {
  type: 'object',
  properties: {
    funcionario_id: { type: 'integer' },
    pessoa_id: { type: 'integer' },
    cargo: { type: 'string' },
    data_contratacao: { type: 'string', format: 'date' }
  },
  required: ['funcionario_id', 'pessoa_id', 'cargo']
};

export const funcionariosListResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    data: { type: 'array', items: funcionarioResponseSchema }
  },
  required: ['status', 'data']
};

export const createFuncionarioBodySchema = {
  type: 'object',
  properties: {
    pessoa_id: { type: 'integer' },
    cargo: { type: 'string' },
    data_contratacao: { type: 'string', format: 'date' }
  },
  required: ['pessoa_id', 'cargo', 'data_contratacao']
};

export const updateFuncionarioBodySchema = {
  type: 'object',
  properties: {
    cargo: { type: 'string' }
  },
  required: ['cargo']
};

export const funcionarioIdParamSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Identificador do funcionário.' }
  },
  required: ['id']
};