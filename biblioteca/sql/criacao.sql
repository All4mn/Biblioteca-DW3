-- =====================================================================
-- SCRIPT DE CRIAÇÃO E POPULAÇÃO DO BANCO DE DADOS - SISTEMA DE BIBLIOTECA
-- PostgreSQL
-- =====================================================================
 
-- Removendo tabelas existentes (ordem inversa às dependências), útil para reexecução
DROP TABLE IF EXISTS emprestimos CASCADE;
DROP TABLE IF EXISTS livros_autores CASCADE;
DROP TABLE IF EXISTS usuarios_membros CASCADE;
DROP TABLE IF EXISTS funcionarios CASCADE;
DROP TABLE IF EXISTS livros CASCADE;
DROP TABLE IF EXISTS autores CASCADE;
DROP TABLE IF EXISTS categorias_generos CASCADE;
DROP TABLE IF EXISTS pessoas CASCADE;
 
-- =====================================================================
-- TABELA: PESSOAS
-- =====================================================================
CREATE TABLE pessoas (
    pessoa_id        SERIAL PRIMARY KEY,
    nome             VARCHAR(150) NOT NULL,
    email            VARCHAR(150) UNIQUE,
    telefone         VARCHAR(30),
    data_nascimento  DATE,
    cpf              VARCHAR(14) UNIQUE NOT NULL
);
 
-- =====================================================================
-- TABELA: FUNCIONARIOS
-- =====================================================================
CREATE TABLE funcionarios (
    funcionario_id    SERIAL PRIMARY KEY,
    pessoa_id         INTEGER NOT NULL UNIQUE REFERENCES pessoas(pessoa_id),
    cargo             VARCHAR(100) NOT NULL,
    data_contratacao  DATE NOT NULL
);
 
-- =====================================================================
-- TABELA: USUARIOS_MEMBROS
-- =====================================================================
CREATE TABLE usuarios_membros (
    usuario_id      SERIAL PRIMARY KEY,
    pessoa_id       INTEGER NOT NULL UNIQUE REFERENCES pessoas(pessoa_id),
    nome            VARCHAR(150) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    telefone        VARCHAR(30),
    data_cadastro   DATE NOT NULL
);
 
-- =====================================================================
-- TABELA: CATEGORIAS_GENEROS
-- =====================================================================
CREATE TABLE categorias_generos (
    categoria_id  SERIAL PRIMARY KEY,
    nome          VARCHAR(120) NOT NULL,
    descricao     TEXT
);
 
-- =====================================================================
-- TABELA: LIVROS
-- (categoria_id incluído para viabilizar o relacionamento "pertence_a"
--  com CATEGORIAS_GENEROS mostrado no wireframe)
-- =====================================================================
CREATE TABLE livros (
    livro_id         SERIAL PRIMARY KEY,
    titulo           VARCHAR(200) NOT NULL,
    isbn             VARCHAR(20) UNIQUE,
    ano_publicacao   INTEGER NOT NULL,
    editora          VARCHAR(120),
    categoria_id     INTEGER REFERENCES categorias_generos(categoria_id)
);
 
-- =====================================================================
-- TABELA: AUTORES
-- =====================================================================
CREATE TABLE autores (
    autor_id       SERIAL PRIMARY KEY,
    nome           VARCHAR(150) NOT NULL,
    nacionalidade  VARCHAR(80)
);
 
-- =====================================================================
-- TABELA: LIVROS_AUTORES (associativa N:N)
-- =====================================================================
CREATE TABLE livros_autores (
    livro_id  INTEGER NOT NULL REFERENCES livros(livro_id),
    autor_id  INTEGER NOT NULL REFERENCES autores(autor_id),
    PRIMARY KEY (livro_id, autor_id)
);
 
-- =====================================================================
-- TABELA: EMPRESTIMOS
-- =====================================================================
CREATE TABLE emprestimos (
    emprestimo_id           SERIAL PRIMARY KEY,
    usuario_id              INTEGER NOT NULL REFERENCES usuarios_membros(usuario_id),
    livro_id                INTEGER NOT NULL REFERENCES livros(livro_id),
    funcionario_id          INTEGER NOT NULL REFERENCES funcionarios(funcionario_id),
    data_emprestimo         DATE NOT NULL,
    data_devolucao_prevista DATE NOT NULL,
    data_devolucao_real     DATE,
    status                  VARCHAR(30) NOT NULL
);
 