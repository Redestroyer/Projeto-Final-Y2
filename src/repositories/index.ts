export type QueryResult<T> = T & {
  count: number;
  affectedRows: number;
  lastInsertedRowid: number;
  columns: ColumnWithMetadata[]
};
export interface ColumnWithMetadata {
  name: string;
  type: number;
  table: string;
};

export * from "./Plano";
export * from "./Usuário";
