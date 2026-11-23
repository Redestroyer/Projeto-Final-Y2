import type { PlanoBase, PlanoDB } from "./Plano";

export interface UsuárioBase {
  cpf: string;
  name: string;
  email: string;
  telefone: string;
  dataNasc: Date;
  sexo: "n" | "f" | "m";
  senha: string;
}
export interface AdministradorBase extends UsuárioBase {}
export interface ProfessorBase extends UsuárioBase {
  cref: string;
  especialidade: string;
  ativo: boolean;
}
export interface AlunoBase extends UsuárioBase {
  cpfProfessor: ProfessorBase["cpf"];
  idPlano: PlanoBase["id"];
  ativo: boolean;
}

export class UsuárioBlank {
  cpf: UsuárioBase["cpf"];
  name: UsuárioBase["name"];
  email: UsuárioBase["email"];
  telefone: UsuárioBase["telefone"];
  dataNasc: UsuárioBase["dataNasc"];
  sexo: UsuárioBase["sexo"];
  senha: UsuárioBase["senha"];
  
  constructor({ cpf, name, email, telefone, dataNasc, sexo, senha }: UsuárioBase) {
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.sexo = sexo;
    this.senha = senha;
  }
}

export class UsuárioDB {
  readonly cpf: UsuárioBase["cpf"];
  name: UsuárioBase["name"];
  email: UsuárioBase["email"];
  telefone: UsuárioBase["telefone"];
  dataNasc: UsuárioBase["dataNasc"];
  sexo: UsuárioBase["sexo"];
  senha: UsuárioBase["senha"];
  
  constructor({ cpf, name, email, telefone, dataNasc, sexo, senha }: UsuárioBase) {
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.sexo = sexo;
    this.senha = senha;
  }
}
export class AdministradorDB extends UsuárioDB {
  constructor({ ...user }: AdministradorBase) {
    super(user);
  }
}
export class ProfessorDB extends UsuárioDB {
  cref: string;
  especialidade: string;
  ativo: boolean;
  
  constructor({ cref, especialidade, ativo, ...user }: ProfessorBase) {
    super(user);
    this.cref = cref;
    this.especialidade = especialidade;
    this.ativo = ativo;
  }
}
export class AlunoDB extends UsuárioDB {
  cpfProfessor: ProfessorDB["cpf"];
  idPlano: PlanoDB["id"];
  ativo: boolean;

  constructor({ cpfProfessor, idPlano, ativo, ...user }: AlunoBase) {
    super(user);
    this.cpfProfessor = cpfProfessor;
    this.idPlano = idPlano;
    this.ativo = ativo;
  }
}