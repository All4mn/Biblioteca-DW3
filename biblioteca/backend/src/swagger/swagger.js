export const swaggerOptions = {
  openapi: {
    info: {
      title: 'API Biblioteca',
      description: 'API para gerenciamento de tarefas e cadastros da biblioteca.',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    tags: [
      {
        name: 'Usuarios',
        description: 'Operações relacionadas à tabela usuarios_membros.'
      },
      {
        name: 'Pessoas',
        description: 'Operações relacionadas à tabela pessoas.'
      },
      {
        name: 'Autores',
        description: 'Operações relacionadas à tabela autores.'
      },
      {
        name: 'CategoriasGenero',
        description: 'Operações relacionadas à tabela categorias_generos.'
      },
      {
        name: 'Livros',
        description: 'Operações relacionadas à tabela livros.'
      },
      {
        name: 'Funcionarios',
        description: 'Operações relacionadas à tabela funcionarios.'
      },
      {
        name: 'Emprestimos',
        description: 'Operações relacionadas à tabela emprestimos.'
      },
      {
        name: 'LivrosAutores',
        description: 'Operações relacionadas à tabela livros_autores.'
      }
    ]
  }
};

export const swaggerUIoptions = {
  routePrefix: '/docs',
  swagger: {
    url: '/docs/json'
  }
};