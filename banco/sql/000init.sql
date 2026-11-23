-- CREATE DATABASE GestaoAcademia;
--
-- USE GestaoAcademia;
-- ===============================
-- Não usemos as instruções de criação de banco; apenas de tabelas.
-- Ao usarmos no código, já teremos o banco criado e ligado.
-- Ao usarmos no *workbench*, criemos e liguemos o banco a parte.

CREATE TABLE Usuario (
    CPF VARCHAR(14) PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    dataNasc DATE NOT NULL,
    Sexo CHAR(1),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Senha VARCHAR(8) NOT NULL,
    Telefone VARCHAR(11)
);

CREATE TABLE Administrador (
    CPF VARCHAR(14) PRIMARY KEY,
	FOREIGN KEY (CPF) REFERENCES Usuario(CPF) 
);

CREATE TABLE Professor (
    CPF VARCHAR(14) PRIMARY KEY,
    CREF VARCHAR(20) UNIQUE NOT NULL,
    Especialidade VARCHAR(100),
    Ativo BOOLEAN DEFAULT TRUE,
	FOREIGN KEY (cpf) REFERENCES Usuario(CPF) 
);

CREATE TABLE Plano (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    DuracaoMeses INT NOT NULL,
    Valor DECIMAL(10, 2) NOT NULL,
    DiaVencimento INT NOT NULL,
    Cobranca VARCHAR(50),
    Ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE Aluno (
   CPF VARCHAR(14) PRIMARY KEY,
    Ativo BOOLEAN DEFAULT TRUE,
    CPFProfessor VARCHAR(14), 
    idPlano INT NOT NULL,     
	FOREIGN KEY (CPF) REFERENCES Usuario(CPF),
	FOREIGN KEY (CPFProfessor) REFERENCES Professor(CPF),
    FOREIGN KEY (idPlano) REFERENCES Plano(id)
);

CREATE TABLE Mensalidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Vencimento DATE NOT NULL,
    Valor DECIMAL(10, 2) NOT NULL,
    Situacao VARCHAR(30) NOT NULL,
    dataPagamento DATE,
    CPFAluno VARCHAR(14) NOT NULL, 
    idPlano INT NOT NULL,         
    FOREIGN KEY (CPF_aluno) REFERENCES Aluno(CPF),
    FOREIGN KEY (id_plano) REFERENCES Plano(id)
);

CREATE TABLE FichaTreino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Inicio DATE NOT NULL,
    validade DATE NOT NULL,
    ativa BOOLEAN DEFAULT TRUE,
    cpf_professor VARCHAR(14) NOT NULL, 
    cpf_aluno VARCHAR(14) NOT NULL,     
	FOREIGN KEY (CPF_Professor) REFERENCES Professor(CPF),
	FOREIGN KEY (CPF_Aluno) REFERENCES Aluno(CPF)
);

create table Exercicio (
    id int auto_increment primary key,
    nome varchar(100) not null,
    grupoMuscular varchar(50) not null,
    equipamento varchar(100),
    nivel varchar(30),
    descricaoExecucao text,
    ativo boolean not null default true
);

create table FichaExercicio (
    id_ficha int not null,
    id_exercicio int not null,
    series int not null,
    repeticoes varchar(30) not null,
    cargaKg decimal(6,2),
    primary key(id_ficha, id_exercicio),
    foreign key (id_ficha) references FichaTreino(id),
    foreign key (id_exercicio) references Exercicio(id),
);

create table TreinoRealizado (
    id int auto_increment primary key,
    data date not null,
    completo boolean not null default false,
    id_ficha int not null,
    foreign key (id_ficha) references FichaTreino(id)
);

create table RegistroExercicio (
    id_treinoRealizado int not null,
    id_exercicio int not null,
    series int not null,
    repeticoes varchar(30) not null,
    cargaUsadaKg decimal(6,2),
    primary key(id_treinoRealizado, id_exercicio),
    foreign key (id_treinoRealizado) references TreinoRealizado(id),
    foreign key (id_exercicio) references Exercicio(id),
);
