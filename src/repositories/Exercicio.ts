import type { SQL } from "bun";
import { ExercicioBlank, ExercicioDB } from "@/models";

type ExercicioRow = {
  id: number;
  nome: string;
  grupoMuscular: string;
  equipamento?: string;
  nivel?: string;
  descricaoExecucao?: string;
  ativo: boolean;
};

export class ExercicioRepository {
  static readonly tabela = "Exercicio";
  readonly tabelaFragment;
  readonly camposFragment;
  
  constructor(
    public readonly sql: SQL
  ) {
    this.tabelaFragment = sql(ExercicioRepository.tabela);
    this.camposFragment = sql`id, nome, grupoMuscular, equipamento, nivel, descricaoExecucao, ativo`;
  }

  private async fromRow(row: ExercicioRow): Promise<ExercicioDB> {
    return new ExercicioDB(row);
  }
  private async fromRows(rows: ExercicioDB[]): Promise<ExercicioDB[]> {
    return Promise.all(rows.map(this.fromRow));
  }

  private async intoRegister(data: ExercicioBlank) {
    const { nome, grupoMuscular, equipamento, nivel, descricaoExecucao, ativo } = data;
    return { nome, grupoMuscular, equipamento, nivel, descricaoExecucao, ativo };
  }

  public async listarTodos(q?: { limite?: number; deslocamento?: number }): Promise<ExercicioDB[]> {
    const limite = q?.limite ?? 128;
    const deslocamento = q?.limite ?? 0;

    const query = await this.sql<ExercicioDB[]>`select ${this.camposFragment} from ${this.tabelaFragment} limit ${limite} offset ${deslocamento};`;
    return await this.fromRows(query);
  }

  public async cadastrar(...dados: ExercicioBlank[]): Promise<ExercicioDB[]> {
    const register = await Promise.all(dados.map(this.intoRegister));
    const query = await this.sql<{}>`insert into ${this.tabelaFragment} ${this.sql(register)};`;
    // `lastInsertRowid` retorna a ID da *primeira* linha inserida. Vai ver.
    const deslocamento = query.lastInsertRowid as number;
    return await this.listarTodos({ limite: register.length, deslocamento });
  }

  public async atualizar(exercicio: ExercicioDB): Promise<boolean> {
    const register = await this.intoRegister(exercicio);
    return await this.sql`update ${this.tabelaFragment} set ${this.sql(register)} where id = ${exercicio.id}`.then(_=>true,_=>false);
  }
}