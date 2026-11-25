import { PlanoDB, type PlanoBlank } from "@/models";
import type { SQL } from "bun";

type PlanoRow = {
  id: number;
  nome: string;
  valor: number;
  duracaoMeses: number;
  diaVencimento: Date;
  cobranca: string;
  ativo: boolean;
};
export class PlanoRepository {
  static readonly tabela = "Plano";
  readonly tabelaFragment;
  readonly camposFragment;

  constructor(
    public readonly sql: SQL
  ) {
    this.tabelaFragment = sql(PlanoRepository.tabela);
    this.camposFragment = sql`id, nome, duracaoMeses, valor, diaVencimento, cobranca, ativo`;
  }

  private async fromRow(row: PlanoRow): Promise<PlanoDB> {
    return new PlanoDB(row);
  }
  private async fromRows(rows: PlanoRow[]): Promise<PlanoDB[]> {
    return Promise.all(rows.map(this.fromRow));
  }

  private async intoRegister(data: PlanoBlank) {
    const { nome, valor, duracaoMeses, diaVencimento, cobranca, ativo } = data;
    return { nome, valor, duracaoMeses, diaVencimento, cobranca, ativo };
  }

  public async consultarPorID(id: PlanoDB["id"]): Promise<PlanoDB | null> {
    const query = await this.sql<[PlanoRow] | []>`select ${this.camposFragment} from ${this.tabelaFragment} where id = ${id} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.fromRow(query[0]);
  }
  public async listarTodos(q?: { limite?: number; deslocamento?: number }): Promise<PlanoDB[]> {
    const limite = q?.limite ?? 128;
    const deslocamento = q?.deslocamento ?? 0;

    const query = await this.sql<PlanoRow[]>`select ${this.camposFragment} from ${this.tabelaFragment} limit ${limite} offset ${deslocamento};`;
    return await this.fromRows(query);
  }

  public async cadastrar(...dados: PlanoBlank[]): Promise<PlanoDB[]> {
    const register = await Promise.all(dados.map(this.intoRegister));
    const query = await this.sql<{}>`insert into ${this.tabelaFragment} ${this.sql(register)};`;
    const deslocamento = query.lastInsertRowid as number;
    return await this.listarTodos({ limite: register.length, deslocamento });
  }

  public async atualizar(plano: PlanoDB): Promise<boolean> {
    const register = await this.intoRegister(plano);
    return await this.sql`update ${this.tabelaFragment} set ${this.sql(register)} where id = ${plano.id}`.then(_=>true,_=>false);
  }
}