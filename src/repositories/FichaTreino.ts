import { FichaTreinoBlank, FichaTreinoDB } from "@/models";
import type { SQL } from "bun";

type FichaTreinoRow = {
  id: number;
  inicio: Date;
  validade: Date;
  ativa: boolean;
  cpfProfessor: string;
  cpfAluno: string;
};
export class FichaTreinoRepository {
  static readonly tabela = "FichaTreino";
  readonly tabelaFragment;
  readonly camposFragment;

  constructor(
    public readonly sql: SQL
  ) {
    this.tabelaFragment = sql(FichaTreinoRepository.tabela);
    this.camposFragment = sql`id, inicio, validade, ativa, cpfProfessor, cpfAluno`;
  }

  private async fromRow(row: FichaTreinoRow): Promise<FichaTreinoDB> {
    return new FichaTreinoDB(row);
  }
  private async fromRows(rows: FichaTreinoRow[]): Promise<FichaTreinoDB[]> {
    return await Promise.all(rows.map(this.fromRow));
  }

  private async intoRegister(data: FichaTreinoBlank) {
    const { inicio, validade, ativa, cpfProfessor, cpfAluno } = data;
    return { inicio, validade, ativa, cpfProfessor, cpfAluno };
  }

  public async listarTodos(q?: { limite?: number; deslocamento?: number }): Promise<FichaTreinoDB[]> {
    const limite = q?.limite ?? 128;
    const deslocamento = q?.limite ?? 0;

    const query = await this.sql<FichaTreinoRow[]>`select ${this.camposFragment} from ${this.tabelaFragment} limit ${limite} offset ${deslocamento};`;
    return await this.fromRows(query);
  }

  public async cadastrar(...dados: FichaTreinoBlank[]): Promise<FichaTreinoDB[]> {
    const register = await Promise.all(dados.map(this.intoRegister));
    const query = await this.sql<{}>`insert into ${this.tabelaFragment} ${this.sql(register)};`;
    const deslocamento = query.lastInsertRowid as number;
    return await this.listarTodos({ limite: register.length, deslocamento });
  }

  public async atualizar(exercicio: FichaTreinoDB): Promise<boolean> {
    const register = await this.intoRegister(exercicio);
    return await this.sql`update ${this.tabelaFragment} set ${this.sql(register)} where id = ${exercicio.id}`.then(_=>true,_=>false);
  }
}