CREATE DATABASE GestaoDeAcademia;

USE GestaoDeAcademia;

CREATE TABLE Usuario (
	CPF VARCHAR(11) NOT NULL,
    Nome VARCHAR(100) NOT NULL,
    DataNascimento DATE,
    Sexo VARCHAR(10),
    Email VARCHAR(100) UNIQUE,
    Telefone VARCHAR(20),
    PRIMARY KEY (CPF)
);

CREATE TABLE Administrador (
	CPF_Usuario VARCHAR(11) NOT NULL,
    PRIMARY KEY (CPF_Usuario),
    FOREIGN KEY (CPF_Usuario) REFERENCES Usuario(CPF)
);

CREATE TABLE Aluno (
	CPF_Usuario VARCHAR(11) NOT NULL,
    PRIMARY KEY (CPF_Usuario),
    FOREIGN KEY (CPF_Usuario) REFERENCES Usuario(CPF)
);

CREATE TABLE Plano (
	ID INT AUTO_INCREMENT NOT NULL,
    Tipo VARCHAR(50),
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    PRIMARY KEY (ID)
);

CREATE TABLE Exercicio (
	ID INT AUTO_INCREMENT NOT NULL,
    Tipo VARCHAR(50),
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT,
    PRIMARY KEY (ID)
);

CREATE TABLE Matricula (
	ID INT AUTO_INCREMENT NOT NULL,
    CPF_Aluno VARCHAR (11) NOT NULL,
    ID_Plano INT NOT NULL,
    Inicio DATE NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (CPF_Aluno) REFERENCES Aluno(CPF_Usuario),
    FOREIGN KEY (ID_Plano) REFERENCES Plano(ID)
);

CREATE TABLE Mensalidade (
	ID INT AUTO_INCREMENT NOT NULL,
    ID_Matricula INT NOT NULL,
    Valor DECIMAL(10,2) NOT NULL,
    Validade DATE NOT NULL,
    Pago TINYINT(1) DEFAULT 0,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_Matricula) REFERENCES Matricula(ID)
);

CREATE TABLE FichaDeTreino (
	ID INT AUTO_INCREMENT NOT NULL,
    CPF_aluno VARCHAR(11) NOT NULL,
    ID_Plano INT NOT NULL,
    Validade DATE,
    PRIMARY KEY (ID),
    FOREIGN KEY (CPF_Aluno) REFERENCES Aluno(CPF_Usuario),
    FOREIGN KEY (ID_Plano) REFERENCES Plano(ID)
);

CREATE TABLE Incluir (
	ID_Ficha INT NOT NULL,
    ID_Exercicio INT NOT NULL,
    Series INT,
    Repeticoes INT,
    Carga DECIMAL (6,2),
    PRIMARY KEY (ID_Ficha,Id_Exercicio),
    FOREIGN KEY (ID_Ficha) REFERENCES Ficha(ID),
    FOREIGN KEY (ID_Exercicio) REFERENCES Exercicio(ID)
)