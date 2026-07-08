export const usuarioResponseSchema = {
  type: 'object',
  properties: {
    usuario_id: { type: 'integer' },
    pessoa_id: { type: 'integer' },
    nome: { type: 'string' },
    email: { type: 'string' },
    telefone: { type: 'string' },
    cpf: { type: 'string' },
    data_nascimento: { type: 'string', format: 'date' },
    ativo: { type: 'boolean' }
  },
  required: ['usuario_id', 'pessoa_id', 'nome', 'email', 'ativo']
};

export const usuariosListResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    data: {
      type: 'array',
      items: usuarioResponseSchema
    }
  },
  required: ['status', 'data']
};

export const createUsuarioBodySchema = {
  type: 'object',
  properties: {
    pessoa_id: {
      type: 'integer',
      description: 'ID da pessoa já cadastrada que será vinculada ao usuário.'
    }
  },
  required: ['pessoa_id']
};

export const usuarioIdParamSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'Identificador do usuário.'
    }
  },
  required: ['id']
};

export const pessoaIdParamSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'Identificador da pessoa relacionada ao usuário.'
    }
  },
  required: ['id']
};

export const usuarioToggleResponseSchema = {
  type: 'array',
  items: usuarioResponseSchema
};

export const usuarioEmprestimosResponseSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      usuario_id: { type: 'integer' },
      nome: { type: 'string' },
      titulo: { type: 'string' },
      editora: { type: 'string' },
      data_emprestimo: { type: 'string', format: 'date-time' },
      data_devolucao_prevista: { type: 'string', format: 'date-time' },
      data_devolucao_real: { type: 'string', format: 'date-time' },
      status: { type: 'string' }
    },
    required: ['usuario_id', 'nome', 'titulo', 'status']
  }
};
