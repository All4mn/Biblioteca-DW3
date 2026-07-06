-- =====================================================================
-- POPULAÇÃO DAS TABELAS
-- =====================================================================
 
-- PESSOAS
INSERT INTO pessoas (nome, email, telefone, data_nascimento, cpf) VALUES
('Ana Beatriz Souza',   'ana.souza@email.com',    '(44) 99101-1234', '1990-03-12', '111.111.111-11'),
('Carlos Eduardo Lima', 'carlos.lima@email.com',  '(44) 99102-2345', '1985-07-25', '222.222.222-22'),
('Fernanda Alves',      'fernanda.alves@email.com','(44) 99103-3456', '1993-11-02', '333.333.333-33'),
('João Pedro Martins',  'joao.martins@email.com', '(44) 99104-4567', '1978-01-30', '444.444.444-44'),
('Mariana Costa',       'mariana.costa@email.com','(44) 99105-5678', '1995-06-18', '555.555.555-55'),
('Rafael Nogueira',     'rafael.nogueira@email.com','(44) 99106-6789','1988-09-09', '666.666.666-66'),
('Patrícia Rocha',      'patricia.rocha@email.com','(44) 99107-7890', '1999-12-05', '777.777.777-77'),
('Lucas Fernandes',     'lucas.fernandes@email.com','(44) 99108-8901','1991-04-14', '888.888.888-88');
 
-- FUNCIONARIOS (referenciam pessoas)
INSERT INTO funcionarios (pessoa_id, cargo, data_contratacao) VALUES
(1, 'Bibliotecário Chefe', '2015-02-10'),
(2, 'Atendente',           '2019-08-01'),
(4, 'Auxiliar de Acervo',  '2021-05-20');
 
-- USUARIOS_MEMBROS (referenciam pessoas)
INSERT INTO usuarios_membros (pessoa_id, nome, email, telefone, data_cadastro) VALUES
(3, 'Fernanda Alves',  'fernanda.alves@email.com',  '(44) 99103-3456', '2022-01-15'),
(5, 'Mariana Costa',   'mariana.costa@email.com',   '(44) 99105-5678', '2022-03-22'),
(6, 'Rafael Nogueira', 'rafael.nogueira@email.com', '(44) 99106-6789', '2023-02-10'),
(7, 'Patrícia Rocha',  'patricia.rocha@email.com',  '(44) 99107-7890', '2023-07-01'),
(8, 'Lucas Fernandes', 'lucas.fernandes@email.com', '(44) 99108-8901', '2024-01-11');
 
-- CATEGORIAS_GENEROS
INSERT INTO categorias_generos (nome, descricao) VALUES
('Ficção Científica', 'Obras que exploram tecnologias futuras, viagens espaciais e sociedades hipotéticas.'),
('Romance',           'Narrativas centradas em relacionamentos e emoções humanas.'),
('Fantasia',          'Histórias com elementos mágicos, mundos imaginários e criaturas fantásticas.'),
('Biografia',         'Relatos da vida de pessoas reais.'),
('Tecnologia',        'Livros técnicos sobre programação, engenharia e inovação.');
 
-- AUTORES
INSERT INTO autores (nome, nacionalidade) VALUES
('Isaac Asimov',        'Estadunidense'),
('J.K. Rowling',        'Britânica'),
('Machado de Assis',    'Brasileira'),
('Walter Isaacson',     'Estadunidense'),
('Robert C. Martin',    'Estadunidense'),
('Clarice Lispector',   'Brasileira');
 
-- LIVROS
INSERT INTO livros (titulo, isbn, ano_publicacao, editora, categoria_id) VALUES
('Eu, Robô',                       '978-85-01-01111-1', 1950, 'Aleph',            1),
('Harry Potter e a Pedra Filosofal','978-85-01-02222-2', 1997, 'Rocco',            3),
('Dom Casmurro',                   '978-85-01-03333-3', 1899, 'Companhia das Letras', 2),
('Steve Jobs',                     '978-85-01-04444-4', 2011, 'Companhia das Letras', 4),
('Código Limpo',                   '978-85-01-05555-5', 2008, 'Alta Books',       5),
('A Hora da Estrela',              '978-85-01-06666-6', 1977, 'Rocco',            2);
 
-- LIVROS_AUTORES
INSERT INTO livros_autores (livro_id, autor_id) VALUES
(1, 1), -- Eu, Robô - Isaac Asimov
(2, 2), -- Harry Potter - J.K. Rowling
(3, 3), -- Dom Casmurro - Machado de Assis
(4, 4), -- Steve Jobs - Walter Isaacson
(5, 5), -- Código Limpo - Robert C. Martin
(6, 6); -- A Hora da Estrela - Clarice Lispector
 
-- EMPRESTIMOS
INSERT INTO emprestimos (usuario_id, livro_id, funcionario_id, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status) VALUES
(1, 1, 1, '2026-06-01', '2026-06-15', '2026-06-14', 'devolvido'),
(2, 2, 2, '2026-06-05', '2026-06-19', NULL,         'em_andamento'),
(3, 4, 1, '2026-06-10', '2026-06-24', NULL,         'atrasado'),
(4, 5, 3, '2026-06-20', '2026-07-04', '2026-07-02', 'devolvido'),
(5, 3, 2, '2026-06-25', '2026-07-09', NULL,         'em_andamento');