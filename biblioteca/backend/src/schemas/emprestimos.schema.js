export const emprestimoResponseSchema = {
  type: 'object',
  properties: {
    emprestimo_id: { type: 'integer' },
    usuario_id: { type: 'integer' },
    livro_id: { type: 'integer' },
    funcionario_id: { type: 'integer' },
    data_emprestimo: { type: 'string', format: 'date' },
    data_devolucao_prevista: { type: 'string', format: 'date' },
    data_devolucao_real: { type: 'string', format: 'date' },
    status: { type: 'string' }
  },
  required: ['emprestimo_id', 'usuario_id', 'livro_id', 'funcionario_id', 'status']
};

export const emprestimosListResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    data: { type: 'array', items: emprestimoResponseSchema }
  },
  required: ['status', 'data']
};

export const emprestarLivroBodySchema = {
  type: 'object',
  properties: {
    usuario_id: { type: 'integer' },
    livro_id: { type: 'integer' },
    funcionario_id: { type: 'integer' }
  },
  required: ['usuario_id', 'livro_id', 'funcionario_id']
};

export const emprestimoIdParamSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Identificador do empréstimo.' }
  },
  required: ['id']
};