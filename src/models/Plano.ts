export interface PlanoBase {
  id: number;
  nome: string;
  valor: number;
  duracaoMeses: number;
  diaVencimento: Date;
  cobranca: string;
  ativo: boolean;
};

export class PlanoBlank {
  nome: PlanoBase["nome"];
  valor: PlanoBase["valor"];
  duracaoMeses: PlanoBase["duracaoMeses"];
  diaVencimento: PlanoBase["diaVencimento"];
  cobranca: PlanoBase["cobranca"];
  ativo: PlanoBase["ativo"];

  constructor({ nome, valor, duracaoMeses, diaVencimento, cobranca, ativo }: Omit<PlanoBase, "id">) {
    this.nome = nome;
    this.valor = valor;
    this.duracaoMeses = duracaoMeses;
    this.diaVencimento = diaVencimento;
    this.cobranca = cobranca;
    this.ativo = ativo;
  }
}

export class PlanoDB {
  readonly id: number;
  nome: PlanoBase["nome"];
  valor: PlanoBase["valor"];
  duracaoMeses: PlanoBase["duracaoMeses"];
  diaVencimento: PlanoBase["diaVencimento"];
  cobranca: PlanoBase["cobranca"];
  ativo: PlanoBase["ativo"];

  constructor({ id, nome, valor, duracaoMeses, diaVencimento, cobranca, ativo }: PlanoBase) {
    this.id = id;
    this.nome = nome;
    this.valor = valor;
    this.duracaoMeses = duracaoMeses;
    this.diaVencimento = diaVencimento;
    this.cobranca = cobranca;
    this.ativo = ativo;
  }
}
