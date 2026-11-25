import type { PlanoBase, PlanoDB } from "./Plano";

export interface UsuarioBase {
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  dataNasc: Date;
  sexo: "n" | "f" | "m";
  senha: string;
}
export interface AdministradorBase extends UsuarioBase {}
export interface ProfessorBase extends UsuarioBase {
  cref: string;
  especialidade?: string;
  ativo: boolean;
}
export interface AlunoBase extends UsuarioBase {
  cpfProfessor: ProfessorBase["cpf"];
  idPlano: PlanoBase["id"];
  ativo: boolean;
}

export abstract class UsuarioBlank {
  cpf: UsuarioBase["cpf"];
  nome: UsuarioBase["nome"];
  email: UsuarioBase["email"];
  telefone: UsuarioBase["telefone"];
  dataNasc: UsuarioBase["dataNasc"];
  sexo: UsuarioBase["sexo"];
  senha: UsuarioBase["senha"];
  
  constructor({ cpf, nome, email, telefone, dataNasc, sexo, senha }: UsuarioBase) {
    this.cpf = cpf;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.sexo = sexo;
    this.senha = senha;
  }
}
export class AdministradorBlank extends UsuarioBlank {}
export class ProfessorBlank extends UsuarioBlank {
  cref: ProfessorBase["cref"];
  especialidade: ProfessorBase["especialidade"];
  ativo: ProfessorBase["ativo"];
  
  constructor({ cref, especialidade, ativo, ...user }: ProfessorBase) {
    super(user);
    this.cref = cref;
    this.especialidade = especialidade;
    this.ativo = ativo;
  }
}
export class AlunoBlank extends UsuarioBlank {
  cpfProfessor: AlunoBase["cpfProfessor"];
  idPlano: AlunoBase["idPlano"];
  ativo: AlunoBase["ativo"];

  constructor({ cpfProfessor, idPlano, ativo, ...user }: AlunoBase) {
    super(user);
    this.cpfProfessor = cpfProfessor;
    this.idPlano = idPlano;
    this.ativo = ativo;
  }
}

export class UsuarioDB {
  readonly cpf: UsuarioBase["cpf"];
  nome: UsuarioBase["nome"];
  email: UsuarioBase["email"];
  telefone: UsuarioBase["telefone"];
  dataNasc: UsuarioBase["dataNasc"];
  sexo: UsuarioBase["sexo"];
  senha: UsuarioBase["senha"];
  
  constructor({ cpf, nome, email, telefone, dataNasc, sexo, senha }: UsuarioBase) {
    this.cpf = cpf;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.sexo = sexo;
    this.senha = senha;
  }

  get role(): string { return "USR"; }
}
export class AdministradorDB extends UsuarioDB {
  constructor({ ...user }: AdministradorBase) {
    super(user);
  }

  get role() { return "ADM"; }
}
export class ProfessorDB extends UsuarioDB {
  cref: string;
  especialidade?: string;
  ativo: boolean;
  
  constructor({ cref, especialidade, ativo, ...user }: ProfessorBase) {
    super(user);
    this.cref = cref;
    this.especialidade = especialidade;
    this.ativo = ativo;
  }

  get role() { return "PRF"; }
}
export class AlunoDB extends UsuarioDB {
  cpfProfessor: ProfessorDB["cpf"];
  idPlano: PlanoDB["id"];
  ativo: boolean;

  constructor({ cpfProfessor, idPlano, ativo, ...user }: AlunoBase) {
    super(user);
    this.cpfProfessor = cpfProfessor;
    this.idPlano = idPlano;
    this.ativo = ativo;
  }

  get role() { return "ALN" }
}