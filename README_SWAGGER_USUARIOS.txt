Como usar o Swagger para as rotas de usuarios

1. O que foi criado
- Um schema reutilizável para a entidade de usuários em src/schemas/usuarios.schema.js.
- Documentação OpenAPI nas rotas de usuários em src/features/usuarios/usuarios.routes.js.
- A tag "Usuarios" foi registrada no Swagger em src/swagger/swagger.js para separar essas rotas das demais.

2. O que cada rota faz
- GET /usuarios
  Retorna a lista de usuários cadastrados, incluindo dados da pessoa vinculada.
- GET /usuarios/:id
  Busca um usuário específico pelo seu identificador.
- POST /usuarios
  Cria um novo usuário a partir do ID de uma pessoa já cadastrada.
- PUT /usuarios/:id
  Altera o status ativo/inativo do usuário informado.
- GET /usuarios/pessoa/:id
  Busca o usuário associado ao ID de pessoa informado.
- GET /usuarios/emprestimos/:id
  Lista os empréstimos vinculados ao usuário informado.

3. Campos disponíveis para teste no Swagger
- POST /usuarios
  Corpo esperado:
  {
    "pessoa_id": 1
  }

- GET /usuarios/:id
  Parâmetro de rota:
  id (inteiro)

- PUT /usuarios/:id
  Parâmetro de rota:
  id (inteiro)

- GET /usuarios/pessoa/:id
  Parâmetro de rota:
  id (inteiro)

- GET /usuarios/emprestimos/:id
  Parâmetro de rota:
  id (inteiro)

4. Como visualizar no Swagger
- Inicie o backend com:
  npm run dev
- Acesse:
  http://localhost:3000/docs

5. Como este modelo foi montado para ser replicável
- Os schemas ficam centralizados em src/schemas/.
- Cada rota recebe summary, description, params, body e response.
- Isso facilita expandir a documentação para outras tabelas, pois o padrão pode ser repetido com pequenas mudanças.

6. Componentes criados e para que servem
- usuarioResponseSchema: define o formato de retorno de um usuário.
- usuariosListResponseSchema: define o formato de retorno da listagem de usuários.
- createUsuarioBodySchema: define o corpo de requisição para criar um usuário.
- usuarioIdParamSchema: define o parâmetro id para rotas de usuário.
- pessoaIdParamSchema: define o parâmetro id para busca por pessoa.
- usuarioToggleResponseSchema: define a resposta esperada para a alteração de status do usuário.
- usuarioEmprestimosResponseSchema: define a resposta da listagem de empréstimos do usuário.
