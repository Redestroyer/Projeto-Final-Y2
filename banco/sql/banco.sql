Drop database if exists GestaoAcademia;
Create database GestaoAcademia;
USE GestaoAcademia;
-- ===============================
-- Não usemos as instruções de criação de banco; apenas de tabelas.
-- Ao usarmos no código, já teremos o banco criado e ligado.
-- Ao usarmos no *workbench*, criemos e liguemos o banco a parte.

CREATE TABLE Usuario (
  cpf VARCHAR(14) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  dataNasc DATE NOT NULL,
  sexo CHAR(1),
  email VARCHAR(100) NOT NULL,
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
  id INT PRIMARY KEY,
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

