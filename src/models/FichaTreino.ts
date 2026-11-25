import type { AlunoBase, ProfessorBase } from "./Usuario";

export interface FichaTreinoBase {
  id: number;
  inicio: Date;
  validade: Date;
  ativa: boolean;
  cpfProfessor: ProfessorBase["cpf"]; 
  cpfAluno: AlunoBase["cpf"];
};

export class FichaTreinoBlank {
  inicio: FichaTreinoBase["inicio"];
  validade: FichaTreinoBase["validade"];
  ativa: FichaTreinoBase["ativa"];
  cpfProfessor: FichaTreinoBase["cpfProfessor"];
  cpfAluno: FichaTreinoBase["cpfAluno"];

  constructor({ inicio, validade, ativa, cpfProfessor, cpfAluno }: Omit<FichaTreinoBase, "id">) {
    this.inicio = inicio
    this.validade = validade;
    this.ativa = ativa;
    this.cpfProfessor = cpfProfessor;
    this.cpfAluno = cpfAluno;
  }
}

export class FichaTreinoDB {
  readonly id: FichaTreinoBase["id"];
  inicio: FichaTreinoBase["inicio"];
  validade: FichaTreinoBase["validade"];
  ativa: FichaTreinoBase["ativa"];
  cpfProfessor: FichaTreinoBase["cpfProfessor"];
  cpfAluno: FichaTreinoBase["cpfAluno"];

  constructor({ id, inicio, validade, ativa, cpfProfessor, cpfAluno }: FichaTreinoBase) {
    this.id = id;
    this.inicio = inicio
    this.validade = validade;
    this.ativa = ativa;
    this.cpfProfessor = cpfProfessor;
    this.cpfAluno = cpfAluno;
  }
}
