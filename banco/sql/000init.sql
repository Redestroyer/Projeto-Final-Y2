-- CREATE DATABASE GestaoAcademia;
--
-- USE GestaoAcademia;
-- ===============================
-- Não usemos as instruções de criação de banco; apenas de tabelas.
-- Ao usarmos no código, já teremos o banco criado e ligado.
-- Ao usarmos no *workbench*, criemos e liguemos o banco a parte.

CREATE TABLE Usuario (
  cpf VARCHAR(14) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  dataNasc DATE NOT NULL,
  sexo CHAR(1),
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  telefone VARCHAR(11)
);

CREATE TABLE Administrador (
  cpf VARCHAR(14) PRIMARY KEY,
FOREIGN KEY (cpf) REFERENCES Usuario(cpf) 
);

CREATE TABLE Professor (
  cpf VARCHAR(14) PRIMARY KEY,
  cref VARCHAR(20) UNIQUE NOT NULL,
  especialidade VARCHAR(100),
  ativo BIT(1) NOT NULL DEFAULT b'1',
FOREIGN KEY (cpf) REFERENCES Usuario(cpf) 
);

CREATE TABLE Plano (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  duracaoMeses INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  diaVencimento INT NOT NULL,
  cobranca VARCHAR(50),
  ativo BIT(1) NOT NULL DEFAULT b'1'
);

CREATE TABLE Aluno (
  cpf VARCHAR(14) PRIMARY KEY,
  ativo BIT(1) NOT NULL DEFAULT b'1',
  cpfProfessor VARCHAR(14), 
  idPlano INT NOT NULL,     
FOREIGN KEY (cpf) REFERENCES Usuario(cpf),
FOREIGN KEY (cpfProfessor) REFERENCES Professor(cpf),
  FOREIGN KEY (idPlano) REFERENCES Plano(id)
);

CREATE TABLE Mensalidade (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Vencimento DATE NOT NULL,
  Valor DECIMAL(10, 2) NOT NULL,
  Situacao VARCHAR(30) NOT NULL,
  dataPagamento DATE,
  cpfAluno VARCHAR(14) NOT NULL, 
  idPlano INT NOT NULL,         
  FOREIGN KEY (cpfAluno) REFERENCES Aluno(cpf),
  FOREIGN KEY (idPlano) REFERENCES Plano(id)
);

CREATE TABLE FichaTreino (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Inicio DATE NOT NULL,
  validade DATE NOT NULL,
  ativa BIT(1) NOT NULL DEFAULT b'1',
  cpfProfessor VARCHAR(14) NOT NULL, 
  cpfAluno VARCHAR(14) NOT NULL,     
FOREIGN KEY (cpfProfessor) REFERENCES Professor(cpf),
FOREIGN KEY (cpfAluno) REFERENCES Aluno(cpf)
);

create table Exercicio (
  id int auto_increment primary key,
  nome varchar(100) not null,
  grupoMuscular varchar(50) not null,
  equipamento varchar(100),
  nivel varchar(30),
  descricaoExecucao text
);

create table FichaExercicio (
  idFicha int not null,
  idExercicio int not null,
  series int not null,
  repeticoes varchar(30) not null,
  cargaKg decimal(6,2),
  primary key(idFicha, idExercicio),
  foreign key (idFicha) references FichaTreino(id),
  foreign key (idExercicio) references Exercicio(id)
);

create table TreinoRealizado (
  id int auto_increment primary key,
  data date not null,
  completo bit(1) not null default b'0',
  idFicha int not null,
  foreign key (idFicha) references FichaTreino(id)
);

create table RegistroExercicio (
  idTreinoRealizado int not null,
  idExercicio int not null,
  series int not null,
  repeticoes varchar(30) not null,
  cargaUsadaKg decimal(6,2),
  primary key(idTreinoRealizado, idExercicio),
  foreign key (idTreinoRealizado) references TreinoRealizado(id),
  foreign key (idExercicio) references Exercicio(id)
);

create view UsuarioAluno as
  select usr.cpf cpf, usr.nome nome, usr.dataNasc dataNasc, usr.sexo sexo, usr.email email, usr.senha senha, usr.telefone telefone, aln.ativo ativo, aln.cpfProfessor cpfProfessor, aln.idPlano idPlano from Aluno aln join Usuario usr on aln.cpf = usr.cpf;
create view UsuarioProfessor as
  select usr.cpf cpf, usr.nome nome, usr.dataNasc dataNasc, usr.sexo sexo, usr.email email, usr.senha senha, usr.telefone telefone, prf.cref cref, prf.especialidade especialidade, prf.ativo ativo from Professor prf join Usuario usr on prf.cpf = usr.cpf;
create view UsuarioAdministrador as
  select usr.cpf cpf, usr.nome nome, usr.dataNasc dataNasc, usr.sexo sexo, usr.email email, usr.senha senha, usr.telefone telefone from Administrador adm join Usuario usr on adm.cpf = usr.cpf;

insert into Usuario (cpf,nome, dataNasc, sexo,email, senha, telefone)
 Values ('12345678901', "Maria", '2008-09-01', "f","maria@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WDVGcUpzd3g0QWlMWE50Yw$SjQdJQK5JO6BRL4jKBh6Ug", "82988776655"),
  ('98765432100', "João", '2000-12-20', "m","joao@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WDVGcUpzd3g0QWlMWE50Yw$xEVHCEAR9phmG65RMSuo3A", "80877661134"),
  ('12345678910', "ana", '2001-11-05', "f","ana@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WDVGcUpzd3g0QWlMWE50Yw$yYRspFxkd7su7ad8XlI+CA", "55988332277"),
  ("14961514454", "Derick Davi Veríssimo Marinho", "2009-10-02", "m", "ddvm1@aluno.ifal.edu.br", "$argon2id$v=19$m=16,t=2,p=1$cjZ1SmRuRkE1WG1UaTlJQQ$WjF0yaSqUI8uEICjSLezMw", "82991911038"),
 ("13743140489", "Dafny Heloá da Silva Lins", "2009-12-06", "f", "dhsl1@aluno.ifal.edu.br", "$argon2id$v=19$m=16,t=2,p=1$cjZ1SmRuRkE1WG1UaTlJQQ$MvfDywo0TCIE+u8hqwE3ag", "82988752337"),
 ("15342747406", "Hiago Alves Barboza", "2009-07-08", "m", "hab2@aluno.ifal.edu.br", "$argon2id$v=19$m=16,t=2,p=1$cjZ1SmRuRkE1WG1UaTlJQQ$HuH06V9S+0L8nyzV0RVmQg", "82999270773");
 
insert into Administrador (cpf) 
  values ("14961514454"),
 ("13743140489"),
 ("15342747406");
 
insert into Professor (cpf, cref, especialidade, ativo)
 values ('98765432100', 'CREF12345', 'Musculação', b'1'),
 ('12345678910', 'CREF56789', 'Musculação', b'1');
 
insert into Plano (nome, duracaoMeses, valor, diaVencimento, cobranca, ativo)
 values ('Mensal', 1, 99.90, 10, 'Mensal', b'1'),
 ('Semestral', 6, 499.90, 15, 'Semestral', b'1')
;

INSERT INTO Aluno
(CPF, Ativo, CPFProfessor, idPlano)
VALUES
('12345678901', b'1', '00000000002', 1),
('00000000005', b'1', '00000000003', 2),
('00000000006', b'1', '00000000002', 3),
('00000000007', b'1', '00000000003', 1),
('00000000008', b'0', '00000000002', 2);


INSERT INTO Mensalidade
(Vencimento, Valor, Situacao, dataPagamento, CPFAluno, idPlano)
VALUES
('2026-11-10', 79.90, 'Paga', '2026-11-09', '00000000004', 1),
('2026-11-25', 109.90, 'Pendente', NULL, '00000000005', 2),
('2026-11-15', 149.90, 'Paga', '2026-11-14', '00000000006', 3),
('2026-11-20', 79.90, 'Pendente', NULL, '00000000007', 1),
('2026-11-01', 109.90, 'Atrasada', NULL, '00000000008', 2);


INSERT INTO FichaTreino
(Inicio, validade, ativa, CPFProfessor, CPFAluno)
VALUES
('2026-11-01', '2026-12-01', b'1', '00000000002', '00000000004'),
('2026-11-05', '2026-12-05', b'1', '00000000003', '00000000005'),
('2026-10-01', '2026-11-01', b'0', '00000000002', '00000000006'),
('2026-11-10', '2026-12-10', b'1', '00000000003', '00000000007');

insert into Exercicio (nome, grupoMuscular, equipamento, nivel, descricaoExecucao) values
  ("Cardio", "Pernas", "Esteira", null, "Corrida de rítmo ajustável e controlável sobre esteira.")
, ("Supino Reto", "Peitoral;Ombros", "Banco;Barra com pesos", "Difícil", "Levantamento de peso por meio de flexão horizontal, suportado por um banco.")
;
