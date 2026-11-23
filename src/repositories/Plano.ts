import { PlanoDB, type PlanoBlank } from "@/models";
import type { SQL } from "bun";
import type { QueryResult } from ".";

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

  public async consultarPorID(id: PlanoDB["id"]): Promise<PlanoDB | null> {
    const query = await this.sql<QueryResult<[PlanoRow] | []>>`select ${this.camposFragment} from ${this.tabelaFragment} where id = ${id} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.fromRow(query[0]);
  }
  public async listarTodos({ limite, deslocamento }: { limite?: number; deslocamento?: number }): Promise<PlanoDB[]> {
    limite ??= 128;
    deslocamento ??= 0;

    const query = await this.sql<QueryResult<PlanoRow[]>>`select ${this.camposFragment} from ${this.tabelaFragment} limit ${limite} offset ${deslocamento};`;
    return await this.fromRows(query);
  }

  public cadastrar(...planos: PlanoBlank[]) {
    throw new Error("TODO: Register plano.");
  }
}