import type { SQL } from "bun";
import { ExercicioBlank, ExercicioDB } from "@/models";
import { BaseRepository } from ".";

type ExercicioRegister = {
  nome: string;
  grupoMuscular: string;
  equipamento?: string;
  nivel?: string;
  descricaoExecucao?: string;
  ativo: boolean;
};
type ExercicioRow = {
  id: number;
  nome: string;
  grupoMuscular: string;
  equipamento?: string;
  nivel?: string;
  descricaoExecucao?: string;
  ativo: boolean;
};
export class ExercicioRepository extends BaseRepository<ExercicioBlank, ExercicioRegister, ExercicioDB, ExercicioRow>("Exercicio") {
  protected async fromRow(row: ExercicioRow): Promise<ExercicioDB> {
    return new ExercicioDB(row);
  }
  protected async intoRegister(blank: ExercicioBlank): Promise<ExercicioRegister> {
    const { nome, grupoMuscular, equipamento, nivel, descricaoExecucao, ativo } = blank;
    return { nome, grupoMuscular, equipamento, nivel, descricaoExecucao, ativo };
  }
  protected async intoIdentifier(sql: SQL, db: ExercicioDB): Promise<SQL.Query<unknown>> {
    return sql`id = ${db.id}`;
  }
  protected async fieldList(sql: SQL): Promise<SQL.Query<unknown>> {
    return sql`id, nome, grupoMuscular, equipamento, nivel, descricaoExecucao, ativo`
  }

  public async consultarPorID(id: ExercicioDB["id"]): Promise<ExercicioDB | null> {
    const query = await this.query<[] | [ExercicioRow]>({
      where: this.sql`id = ${id}`,
      limit: 1,
    });
    if (query.length == 0)
      return null;
    return await this.fromRow(query[0]);
  }
}