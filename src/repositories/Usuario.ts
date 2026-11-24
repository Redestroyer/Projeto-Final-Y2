import { SQL } from "bun";
import { AdministradorDB, AlunoDB, ProfessorDB, UsuarioDB } from "@/models";

type UsuarioRow = {
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
};
type ProfessorRow = {
  cpf: string;
  cref: string;
  especialidade?: string;
  ativo: boolean;
};
type AdministradorRow = {
  cpf: string;
}
type UsuarioAlunoRow = UsuarioRow & AlunoRow;
type UsuarioProfessorRow = UsuarioRow & ProfessorRow;
type UsuarioAdministradorRow = UsuarioRow & AdministradorRow;
export class UsuarioRepository {
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
    this.tabelaFragment = sql(UsuarioRepository.tabela);
    this.alunoFragment = sql(UsuarioRepository.tabelaAluno);
    this.administradorFragment = sql(UsuarioRepository.tabelaAdministrador);
    this.professorFragment = sql(UsuarioRepository.tabelaProfessor);
    this.alunoViewFragment = sql(UsuarioRepository.viewAluno);
    this.professorViewFragment = sql(UsuarioRepository.viewProfessor);
    this.administradorViewFragment = sql(UsuarioRepository.viewAdministrador);
    this.camposFragment = sql`cpf, nome, dataNasc, sexo, email, senha, telefone`;
    this.alunoCamposFragment = sql`cpf, ativo, cpfProfessor, idPlano`;
    this.administradorCamposFragment = sql`cpf`;
    this.professorCamposFragment = sql`cpf, cref, especialidade, ativo`;
    this.alunoViewCamposFragment = sql`cpf, nome, dataNasc, sexo, email, senha, telefone, ativo, cpfProfessor, idPlano`;
    this.administradorViewCamposFragment = sql`cpf, nome, dataNasc, sexo, email, senha, telefone`;
    this.professorViewCamposFragment = sql`cpf, nome, dataNasc, sexo, email, senha, telefone, cref, especialidade, ativo`;
  }

  private async fromRow(row: UsuarioRow): Promise<UsuarioDB> {
    return new UsuarioDB(row);
  }
  private async fromRows(rows: UsuarioRow[]): Promise<UsuarioDB[]> {
    return Promise.all(rows.map(this.fromRow));
  }
  private async alunoFromRow(row: UsuarioAlunoRow): Promise<AlunoDB> {
    return new AlunoDB(row);
  }
  private async alunosFromRows(rows: UsuarioAlunoRow[]): Promise<AlunoDB[]> {
    return Promise.all(rows.map(this.alunoFromRow));
  }
  private async professorFromRow(row: UsuarioProfessorRow): Promise<ProfessorDB> {
    return new ProfessorDB(row);
  }
  private async administradorFromRow(row: UsuarioAdministradorRow): Promise<AdministradorDB> {
    return new AdministradorDB(row);
  }
  private async alunoFromUserAndRow(user: UsuarioDB, row: AlunoRow): Promise<AlunoDB> {
    return new AlunoDB({ ...user, ...row });
  }

  public async consultarPorCPF(cpf: UsuarioDB["cpf"]): Promise<UsuarioDB | null> {
    const query = await this.sql<[UsuarioRow] | []>`select ${this.camposFragment} from ${this.tabelaFragment} where cpf = ${cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.fromRow(query[0]);
  }
  public async consultarAlunoPorCPF(cpf: AlunoDB["cpf"]): Promise<AlunoDB | null> {
    const query = await this.sql<[UsuarioAlunoRow] | []>`select ${this.alunoViewCamposFragment} from ${this.alunoViewFragment} where cpf = ${cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.alunoFromRow(query[0]);
  }
  public async consultarProfessorPorCPF(cpf: ProfessorDB["cpf"]): Promise<ProfessorDB | null> {
    const query = await this.sql<[UsuarioProfessorRow] | []>`select ${this.professorViewCamposFragment} from ${this.professorViewFragment} where cpf = ${cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.professorFromRow(query[0]);
  }
  public async consultarAdministradorPorCPF(cpf: AdministradorDB["cpf"]): Promise<AdministradorDB | null> {
    const query = await this.sql<[UsuarioAdministradorRow] | []>`select ${this.administradorViewCamposFragment} from ${this.administradorViewFragment} where cpf = ${cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.administradorFromRow(query[0]);
  }
  public async consultarAlunoPorUsuário(user: UsuarioDB): Promise<AlunoDB | null> {
    const query = await this.sql<[AlunoRow] | []>`select ${this.alunoCamposFragment} from ${this.alunoFragment} where cpf = ${user.cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.alunoFromUserAndRow(user, query[0]);
  }

  public async listarOrientados(professor: ProfessorDB["cpf"] | ProfessorDB): Promise<AlunoDB[]> {
    const cpf = typeof professor == "string" ? professor : professor.cpf;
    const query = await this.sql<UsuarioAlunoRow[]>`select ${this.alunoViewCamposFragment} from ${this.alunoViewFragment} where cpfProfessor = ${cpf} limit 1;`;
    return await this.alunosFromRows(query);
  }
}