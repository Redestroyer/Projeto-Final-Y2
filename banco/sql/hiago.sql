
INSERT INTO Aluno
(CPF, Ativo, CPFProfessor, idPlano)
VALUES
('12345678901', TRUE, '000.000.000-02', 1),
('00000000005', TRUE, '000.000.000-03', 2),
('00000000006', TRUE, '000.000.000-02', 3),
('00000000007', TRUE, '000.000.000-03', 1),
('00000000008', FALSE, '000.000.000-02', 2);


INSERT INTO Mensalidade
(Vencimento, Valor, Situacao, dataPagamento, CPFAluno, idPlano)
VALUES
('2026-11-10', 79.90, 'Paga', '2026-11-09', '000.000.000-04', 1),
('2026-11-25', 109.90, 'Pendente', NULL, '000.000.000-05', 2),
('2026-11-15', 149.90, 'Paga', '2026-11-14', '000.000.000-06', 3),
('2026-11-20', 79.90, 'Pendente', NULL, '000.000.000-07', 1),
('2026-11-01', 109.90, 'Atrasada', NULL, '000.000.000-08', 2);


INSERT INTO FichaTreino
(Inicio, validade, ativa, CPFProfessor, CPFAluno)
VALUES
('2026-11-01', '2026-12-01', TRUE, '000.000.000-02', '000.000.000-04'),
('2026-11-05', '2026-12-05', TRUE, '000.000.000-03', '000.000.000-05'),
('2026-10-01', '2026-11-01', FALSE, '000.000.000-02', '000.000.000-06'),
('2026-11-10', '2026-12-10', TRUE, '000.000.000-03', '000.000.000-07');


-- CADASTRAR
INSERT INTO Aluno
(CPF, Ativo, CPFProfessor, idPlano)
VALUES
('000.000.000-09', TRUE, '000.000.000-02', 1);

-- LISTAR
SELECT * FROM Aluno;

-- LISTAR COM DADOS COMPLETOS
SELECT
    U.CPF,
    U.Nome,
    U.Email,
    A.Ativo,
    P.Nome AS Professor,
    PL.Nome AS Plano
FROM Aluno A
INNER JOIN Usuario U ON A.CPF = U.CPF
LEFT JOIN Professor PR ON A.CPFProfessor = PR.CPF
LEFT JOIN Usuario P ON PR.CPF = P.CPF
INNER JOIN Plano PL ON A.idPlano = PL.id;

-- BUSCAR
SELECT *
FROM Aluno
WHERE CPF = '000.000.000-04';

-- EDITAR
UPDATE Aluno
SET Ativo = TRUE,
    CPFProfessor = '000.000.000-03',
    idPlano = 2
WHERE CPF = '000.000.000-04';

-- DESATIVAR
UPDATE Aluno
SET Ativo = FALSE
WHERE CPF = '000.000.000-04';


-- CADASTRAR
INSERT INTO Mensalidade
(Vencimento, Valor, Situacao, dataPagamento, CPFAluno, idPlano)
VALUES
('2026-12-25', 79.90, 'Pendente', NULL, '000.000.000-04', 1);

-- LISTAR
SELECT * FROM Mensalidade;

-- LISTAR COM DADOS DO ALUNO E PLANO
SELECT
    M.id,
    U.Nome AS Aluno,
    M.Vencimento,
    M.Valor,
    M.Situacao,
    M.dataPagamento,
    P.Nome AS Plano
FROM Mensalidade M
INNER JOIN Aluno A ON M.CPFAluno = A.CPF
INNER JOIN Usuario U ON A.CPF = U.CPF
INNER JOIN Plano P ON M.idPlano = P.id;

-- BUSCAR
SELECT *
FROM Mensalidade
WHERE id = 1;

-- EDITAR
UPDATE Mensalidade
SET Vencimento = '2026-12-30',
    Valor = 89.90,
    idPlano = 1
WHERE id = 1;

-- REGISTRAR PAGAMENTO
UPDATE Mensalidade
SET Situacao = 'Paga',
    dataPagamento = CURDATE()
WHERE id = 2;

-- EXCLUIR
DELETE FROM Mensalidade
WHERE id = 1;


-- CADASTRAR
INSERT INTO FichaTreino
(Inicio, validade, ativa, CPFProfessor, CPFAluno)
VALUES
('2026-12-01', '2027-01-01', TRUE,
 '000.000.000-02', '000.000.000-04');

-- LISTAR
SELECT * FROM FichaTreino;

-- LISTAR COM DADOS DO ALUNO E PROFESSOR
SELECT
    F.id,
    U.Nome AS Aluno,
    P.Nome AS Professor,
    F.Inicio,
    F.validade,
    F.ativa
FROM FichaTreino F
INNER JOIN Aluno A ON F.CPFAluno = A.CPF
INNER JOIN Usuario U ON A.CPF = U.CPF
INNER JOIN Professor PR ON F.CPFProfessor = PR.CPF
INNER JOIN Usuario P ON PR.CPF = P.CPF;

-- BUSCAR
SELECT *
FROM FichaTreino
WHERE id = 1;

-- EDITAR
UPDATE FichaTreino
SET Inicio = '2026-12-01',
    validade = '2027-01-15',
    CPFProfessor = '000.000.000-03'
WHERE id = 1;

-- DESATIVAR
UPDATE FichaTreino
SET ativa = FALSE
WHERE id = 1;

-- EXCLUIR
DELETE FROM FichaTreino
WHERE id = 1;


-- TOTAL DE ALUNOS
SELECT COUNT(*) AS TotalAlunos
FROM Aluno;

-- ALUNOS ATIVOS
SELECT COUNT(*) AS AlunosAtivos
FROM Aluno
WHERE Ativo = TRUE;

-- ALUNOS INATIVOS
SELECT COUNT(*) AS AlunosInativos
FROM Aluno
WHERE Ativo = FALSE;

-- MENSALIDADES PAGAS
SELECT *
FROM Mensalidade
WHERE Situacao = 'Paga';

-- MENSALIDADES PENDENTES
SELECT *
FROM Mensalidade
WHERE Situacao = 'Pendente';

-- MENSALIDADES ATRASADAS
SELECT *
FROM Mensalidade
WHERE Situacao = 'Atrasada'
   OR (Situacao = 'Pendente' AND Vencimento < CURDATE());

-- FATURAMENTO
SELECT SUM(Valor) AS Faturamento
FROM Mensalidade
WHERE Situacao = 'Paga';

-- FICHAS ATIVAS
SELECT *
FROM FichaTreino
WHERE ativa = TRUE
AND validade >= CURDATE();

-- ALUNOS POR PROFESSOR
SELECT
    U.Nome AS Professor,
    COUNT(A.CPF) AS TotalAlunos
FROM Professor P
INNER JOIN Usuario U ON P.CPF = U.CPF
LEFT JOIN Aluno A ON P.CPF = A.CPFProfessor
GROUP BY P.CPF, U.Nome;

-- HISTORICO DE MENSALIDADES
SELECT *
FROM Mensalidade
WHERE CPFAluno = '000.000.000-04'
ORDER BY Vencimento DESC;

-- ALUNOS E PLANOS
SELECT
    U.Nome AS Aluno,
    P.Nome AS Plano,
    P.Valor
FROM Aluno A
INNER JOIN Usuario U ON A.CPF = U.CPF
INNER JOIN Plano P ON A.idPlano = P.id;

-- MENSALIDADES POR SITUACAO
SELECT
    Situacao,
    COUNT(*) AS Quantidade
FROM Mensalidade
GROUP BY Situacao;



-- VERIFICAR SE ALUNO EXISTE E ESTA ATIVO
SELECT CPF
FROM Aluno
WHERE CPF = '000.000.000-04'
AND Ativo = TRUE;

-- VERIFICAR SE PROFESSOR EXISTE
SELECT CPF
FROM Professor
WHERE CPF = '000.000.000-02';

-- VERIFICAR SE PLANO EXISTE
SELECT id, Nome, Valor
FROM Plano
WHERE id = 1;

-- VERIFICAR FICHA ATIVA DO ALUNO
SELECT *
FROM FichaTreino
WHERE CPFAluno = '000.000.000-04'
AND ativa = TRUE
AND validade >= CURDATE();

-- ATUALIZAR MENSALIDADES ATRASADAS
UPDATE Mensalidade
SET Situacao = 'Atrasada'
WHERE Situacao = 'Pendente'
AND Vencimento < CURDATE();

-- DESATIVAR FICHAS VENCIDAS
UPDATE FichaTreino
SET ativa = FALSE
WHERE validade < CURDATE();


SELECT * FROM Aluno;
SELECT * FROM Mensalidade;
SELECT * FROM FichaTreino;
