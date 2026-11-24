export interface ExercicioBase {
  id: number;
  nome: string;
  grupoMuscular: string;
  equipamento?: string;
  nivel?: string;
  descricaoExecucao?: string;
  ativo: boolean;
};

export class ExercicioBlank {
  nome: string;
  grupoMuscular: string;
  equipamento?: string;
  nivel?: string;
  descricaoExecucao?: string;
  ativo: boolean;

  constructor({ nome, grupoMuscular, equipamento, nivel, descricaoExecucao, ativo }: Omit<ExercicioBase, "id">) {
    this.nome = nome;
    this.grupoMuscular = grupoMuscular;
    this.equipamento = equipamento;
    this.nivel = nivel;
    this.descricaoExecucao = descricaoExecucao;
    this.ativo = ativo;
  }
}

export class ExercicioDB {
  readonly id: number;
  nome: string;
  grupoMuscular: string;
  equipamento?: string;
  nivel?: string;
  descricaoExecucao?: string;
  ativo: boolean;

  constructor({ id, nome, grupoMuscular, equipamento, nivel, descricaoExecucao, ativo }: ExercicioBase) {
    this.id = id;
    this.nome = nome;
    this.grupoMuscular = grupoMuscular;
    this.equipamento = equipamento;
    this.nivel = nivel;
    this.descricaoExecucao = descricaoExecucao;
    this.ativo = ativo;
  }
}
