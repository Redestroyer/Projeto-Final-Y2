import { SQL } from "bun";
import { AlunoDB, UsuárioDB } from "@/models";
import type { QueryResult } from ".";

type UsuárioRow = {
  cpf: string;
  name: string;
  email: string;
  telefone: string;
  dataNasc: Date;
  sexo: "n" | "f" | "m";
  senha: string;
};
type AlunoRow = {
  cpf: string;
  ativo: boolean;
  cpfProfessor: string;
  idPlano: number;
}
type UsuárioAlunoRow = UsuárioRow & AlunoRow;
export class UsuárioRepository {
  static readonly tabela = "Usuario";
  static readonly tabelaAluno = "Aluno";
  static readonly tabelaAdministrador = "Administrador";
  static readonly tabelaProfessor = "Professor";
  static readonly viewAluno = "UsuarioAluno";
  static readonly viewAdministrador = "UsuarioAdministrador";
  static readonly viewProfessor = "UsuarioProfessor";
  readonly tabelaFragment;
  readonly alunoFragment;
  readonly administradorFragment;
  readonly professorFragment;
  readonly camposFragment;
  readonly alunoCamposFragment;
  readonly administradorCamposFragment;
  readonly professorCamposFragment
  readonly alunoViewFragment;
  readonly administradorViewFragment;
  readonly professorViewFragment;
  readonly alunoViewCamposFragment;
  readonly administradorViewCamposFragment;
  readonly professorViewCamposFragment;

  constructor(
    public readonly sql: SQL
  ) {
    this.tabelaFragment = sql(UsuárioRepository.tabela);
    this.alunoFragment = sql(UsuárioRepository.tabelaAluno);
    this.administradorFragment = sql(UsuárioRepository.tabelaAdministrador);
    this.professorFragment = sql(UsuárioRepository.tabelaProfessor);
    this.alunoViewFragment = sql(UsuárioRepository.viewAluno);
    this.professorViewFragment = sql(UsuárioRepository.viewProfessor);
    this.administradorViewFragment = sql(UsuárioRepository.viewAdministrador);
    this.camposFragment = sql`cpf, nome, dataNasc, sexo, email, senha, telefone`;
    this.alunoCamposFragment = sql`cpf, ativo, cpfProfessor, idPlano`;
    this.administradorCamposFragment = sql`cpf`;
    this.professorCamposFragment = sql`cpf, cref, especialidade, ativo`;
    this.alunoViewCamposFragment = sql`cpf, nome, dataNasc, sexo, email, senha, telefone, ativo, cpfProfessor, idPlano`;
    this.administradorViewCamposFragment = sql`cpf, nome, dataNasc, sexo, email, senha, telefone`;
    this.professorViewCamposFragment = sql`cpf, nome, dataNasc, sexo, email, senha, telefone, cref, especialidade, ativo`;
  }

  private async fromRow(row: UsuárioRow): Promise<UsuárioDB> {
    return new UsuárioDB(row);
  }
  private async fromRows(rows: UsuárioRow[]): Promise<UsuárioDB[]> {
    return Promise.all(rows.map(this.fromRow));
  }
  private async alunoFromRow(row: UsuárioAlunoRow): Promise<AlunoDB> {
    return new AlunoDB(row);
  }

  public async consultarPorCPF(cpf: UsuárioDB["cpf"]): Promise<UsuárioDB | null> {
    const query = await this.sql<QueryResult<[UsuárioRow] | []>>`select ${this.camposFragment} from ${this.tabelaFragment} where cpf = ${cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.fromRow(query[0]);
  }
  public async consultarAlunoPorCPF(cpf: UsuárioDB["cpf"]): Promise<AlunoDB | null> {
    const query = await this.sql<QueryResult<[UsuárioAlunoRow] | []>>`select ${this.alunoViewCamposFragment} from ${this.alunoViewFragment} where cpf = ${cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.alunoFromRow(query[0]);
  }
}