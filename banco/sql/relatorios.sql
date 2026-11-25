Use GestaoAcademia;

-- Usuarios
Select * from Usuarios;

-- Alunos que sao usuarios
SELECT
    u.cpf,
    u.nome,
    u.email,
    a.ativo,
    a.idPlano
FROM Usuario u
INNER JOIN Aluno a
    ON u.cpf = a.cpf;
    
-- Professores que sao usuarios
SELECT
    u.cpf,
    u.nome,
    u.email,
    p.cref,
    p.especialidade,
    p.ativo
FROM Usuario u
INNER JOIN Professor p
    ON u.cpf = p.cpf;
    
-- Adm que sao usuarios
SELECT
    u.cpf,
    u.nome,
    u.email
FROM Usuario u
INNER JOIN Administrador ad
    ON u.cpf = ad.cpf;
    
-- Usuarios que sao adm e alunos 
SELECT
    u.cpf,
    u.nome,
    u.email,
    a.ativo,
    a.idPlano
FROM Usuario u
INNER JOIN Administrador ad
    ON u.cpf = ad.cpf
INNER JOIN Aluno a
    ON u.cpf = a.cpf;
    

-- RELATÓRIO 1: ALUNOS COM MENSALIDADE ATRASADA
-- Identifica alunos que possuem mensalidades não pagas
-- há mais de 5 dias após o vencimento.


SET @dias_tolerancia = 5;

SELECT
    u.nome AS Aluno,
    m.Vencimento,
    m.Valor,
    m.Situacao,
    DATEDIFF(CURDATE(), m.Vencimento) AS DiasAtraso
FROM Mensalidade m
INNER JOIN Aluno a
    ON m.cpfAluno = a.cpf
INNER JOIN Usuario u
    ON a.cpf = u.cpf
WHERE m.Situacao <> 'Pago'
  AND DATEDIFF(CURDATE(), m.Vencimento) > @dias_tolerancia
ORDER BY m.Vencimento;


-- RELATÓRIO 2: FREQUÊNCIA DOS ALUNOS NO MÊS
-- Conta quantos treinos completos cada aluno realizou
-- durante o mês atual, incluindo alunos sem treinos.


SELECT
    u.nome AS Aluno,
    COUNT(tr.id) AS TreinosRealizados
FROM Aluno a
INNER JOIN Usuario u
    ON a.cpf = u.cpf
LEFT JOIN FichaTreino f
    ON a.cpf = f.cpfAluno
LEFT JOIN TreinoRealizado tr
    ON f.id = tr.idFicha
    AND MONTH(tr.data) = MONTH(CURDATE())
    AND YEAR(tr.data) = YEAR(CURDATE())
    AND tr.completo = b'1'
GROUP BY a.cpf, u.nome
ORDER BY TreinosRealizados DESC;


-- RELATÓRIO 3: EXERCÍCIOS MAIS UTILIZADOS
-- Conta quantas vezes cada exercício foi registrado
-- nos treinos e ordena do mais utilizado para o menos.


SELECT
    e.nome AS Exercicio,
    e.grupoMuscular AS GrupoMuscular,
    COUNT(re.idExercicio) AS QuantidadeUtilizada
FROM Exercicio e
INNER JOIN RegistroExercicio re
    ON e.id = re.idExercicio
GROUP BY e.id, e.nome, e.grupoMuscular
ORDER BY QuantidadeUtilizada DESC;


-- RELATÓRIO 4: EVOLUÇÃO DE CARGA POR EXERCÍCIO
-- Mostra a carga utilizada pelo aluno em cada exercício,
-- permitindo acompanhar sua evolução ao longo do tempo.


SELECT
    u.nome AS Aluno,
    e.nome AS Exercicio,
    tr.data AS DataTreino,
    re.cargaUsadaKg AS CargaKg
FROM RegistroExercicio re
INNER JOIN TreinoRealizado tr
    ON re.idTreinoRealizado = tr.id
INNER JOIN FichaTreino f
    ON tr.idFicha = f.id
INNER JOIN Aluno a
    ON f.cpfAluno = a.cpf
INNER JOIN Usuario u
    ON a.cpf = u.cpf
INNER JOIN Exercicio e
    ON re.idExercicio = e.id
WHERE re.cargaUsadaKg IS NOT NULL
ORDER BY u.nome, e.nome, tr.data;


-- RELATÓRIO 5: FICHAS DE TREINO VENCIDAS OU INATIVAS
-- Identifica fichas que precisam ser renovadas
-- ou reativadas pelo professor.

SELECT
    u.nome AS Aluno,
    f.id AS Ficha,
    f.Inicio,
    f.validade,
    CASE
        WHEN f.validade < CURDATE()
            THEN 'Vencida'
        WHEN f.ativa = b'0'
            THEN 'Inativa'
        ELSE 'Valida'
    END AS SituacaoFicha
FROM FichaTreino f
INNER JOIN Aluno a
    ON f.cpfAluno = a.cpf
INNER JOIN Usuario u
    ON a.cpf = u.cpf
WHERE f.validade < CURDATE()
   OR f.ativa = b'0'
ORDER BY f.validade;


-- ALTERAÇÃO DA TABELA FichaTREINO
-- Adiciona a coluna letra para identificar as fichas
-- de treino como A, B, C etc.
-- Execute esta alteração apenas uma vez.

ALTER TABLE FichaTreino
ADD COLUMN letra CHAR(1) NOT NULL DEFAULT 'A';


-- RELATÓRIO 6: FICHAS ATIVAS DUPLICADAS


SELECT
    u.nome AS Aluno,
    f.letra AS LetraFicha,
    COUNT(f.id) AS QuantidadeFichas
FROM FichaTreino f
INNER JOIN Aluno a
    ON f.cpfAluno = a.cpf
INNER JOIN Usuario u
    ON a.cpf = u.cpf
WHERE f.ativa = b'1'
GROUP BY a.cpf, u.nome, f.letra
HAVING COUNT(f.id) > 1;


-- RELATÓRIO 7: EXERCÍCIOS COM VALORES INVÁLIDOS

SELECT
    idFicha,
    idExercicio,
    series,
    repeticoes,
    cargaKg
FROM FichaExercicio
WHERE series <= 0
   OR CAST(repeticoes AS UNSIGNED) <= 0
   OR cargaKg <= 0;


-- RELATÓRIO 8: ALUNOS QUE DEVEM SER BLOQUEADOS

SET @dias_tolerancia = 5;

SELECT DISTINCT
    u.nome AS Aluno,
    u.cpf AS CPF,
    m.Vencimento,
    m.Valor,
    DATEDIFF(CURDATE(), m.Vencimento) AS DiasAtraso,
    'Bloqueado para registrar treinos' AS Situacao
FROM Mensalidade m
INNER JOIN Aluno a
    ON m.cpfAluno = a.cpf
INNER JOIN Usuario u
    ON a.cpf = u.cpf
WHERE m.Situacao <> 'Pago'
  AND DATEDIFF(CURDATE(), m.Vencimento) > @dias_tolerancia;
