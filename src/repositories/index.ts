import type { SQL } from "bun";

type QueryOptions = {
  sql?: SQL;
  where?: SQL.Query<unknown>;
  limit?: number;
  offset?: number;
};
export function BaseRepository<Blank, Register extends object, DB extends Blank, Row extends object>(tableName: string) {
  abstract class C {
    constructor(
      public readonly sql: SQL
    ) {}

    protected abstract fromRow(row: Row): Promise<DB>;
    protected async fromRows(rows: Row[]): Promise<DB[]> {
      return await Promise.all(rows.map(this.fromRow));
    }

    protected abstract intoRegister(blank: Blank): Promise<Register>;
    protected abstract intoIdentifier(sql: SQL, db: DB): Promise<SQL.Query<unknown>>;
    protected abstract fieldList(sql: SQL): Promise<SQL.Query<unknown>>;

    protected query<Q>(options?: QueryOptions): SQL.Query<Q> {
      const sql = options?.sql ?? this.sql;
      const query: SQL.Query<unknown>[] = [sql`select ${this.fieldList(this.sql)} from ${this.sql(tableName)}`];
      if (options) {
        if (options.where) {
          query.push(sql`where ${options.where}`);
        }
        if (options.limit != null || options.offset != null) {
          query.push(sql`limit ${options.limit ?? 128}`);
          if (options.offset) {
            query.push(sql`offset ${options.offset}`);
          }
        }
      }

      // `SQL.Query<T>[]` é expandido em uma consulta completa.
      return sql`${query};`;
    }

    public async listarTodos(q?: { limite?: number; deslocamento?: number }): Promise<DB[]> {
      const limite = q?.limite ?? 128;
      const deslocamento = q?.limite ?? 0;
  
      const query = await this.sql<Row[]>`select ${this.fieldList(this.sql)} from ${this.sql(tableName)} limit ${limite} offset ${deslocamento};`;
      return await this.fromRows(query);
    }

    public async cadastrar(...dados: Blank[]): Promise<DB[]> {
      const register = await Promise.all(dados.map(this.intoRegister));
      const query = await this.sql<{}>`insert into ${this.sql(tableName)} ${this.sql(register)};`;
      const deslocamento = query.lastInsertRowid as number;
      return await this.listarTodos({ limite: register.length, deslocamento });
    }
  
    public async atualizar(dados: DB): Promise<boolean> {
      const register = await this.intoRegister(dados);
      const identifier = await this.intoIdentifier(this.sql, dados);
      return await this.sql`update ${this.sql(tableName)} set ${this.sql(register)} where ${identifier}`.then(_=>true,_=>false);
    }
  }
  return C;
}

export * from "./Exercicio";
export * from "./FichaTreino";
export * from "./Plano";
export * from "./Usuario";
