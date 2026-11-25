import { SQL, type TransactionSQL } from "bun";
import { AdministradorBlank, AdministradorDB, AlunoBlank, AlunoDB, ProfessorBlank, ProfessorDB, UsuarioBlank, UsuarioDB } from "@/models";

type UsuarioRow = {
  cpf: string;
  nome: string;
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
  private async professorFromUserAndRow(user: UsuarioDB, row: ProfessorRow): Promise<ProfessorDB> {
    return new ProfessorDB({ ...user, ...row });
  }
  private async administradorFromUserAndRow(user: UsuarioDB, row: AdministradorRow): Promise<AdministradorDB> {
    return new AdministradorDB({ ...user, ...row });
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
  public async consultarProfessorPorUsuário(user: UsuarioDB): Promise<ProfessorDB | null> {
    const query = await this.sql<[ProfessorRow] | []>`select ${this.professorCamposFragment} from ${this.professorFragment} where cpf = ${user.cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.professorFromUserAndRow(user, query[0]);
  }
  public async consultarAdministradorPorUsuário(user: UsuarioDB): Promise<AdministradorDB | null> {
    const query = await this.sql<[AdministradorRow] | []>`select ${this.administradorCamposFragment} from ${this.administradorFragment} where cpf = ${user.cpf} limit 1;`;
    if (query.length == 0)
      return null;
    return await this.administradorFromUserAndRow(user, query[0]);
  }

  public async listarOrientados(professor: ProfessorDB["cpf"] | ProfessorDB): Promise<AlunoDB[]> {
    const cpf = typeof professor == "string" ? professor : professor.cpf;
    const query = await this.sql<UsuarioAlunoRow[]>`select ${this.alunoViewCamposFragment} from ${this.alunoViewFragment} where cpfProfessor = ${cpf} limit 1;`;
    return await this.alunosFromRows(query);
  }

  private async registerAln({ cpf, nome, dataNasc, sexo, email, senha, telefone, ativo, cpfProfessor, idPlano }: AlunoBlank): Promise<boolean> {
    const usr = { cpf, nome, dataNasc, sexo, email, senha, telefone };
    const aln = { cpf, ativo, cpfProfessor, idPlano };
    return await this.sql.begin(async sql => {
      await sql`insert into ${this.tabelaFragment} ${sql(usr)}`;
      await sql`insert into ${this.alunoFragment} ${sql(aln)}`;
      return true;
    }).catch(_ => false);
  }
  private async registerPrf({ cpf, nome, dataNasc, sexo, email, senha, telefone, cref, especialidade, ativo }: ProfessorBlank): Promise<boolean> {
    const usr = { cpf, nome, dataNasc, sexo, email, senha, telefone };
    const prf = { cpf, cref, especialidade, ativo };
    return await this.sql.begin(async sql => {
      await sql`insert into ${this.tabelaFragment} ${sql(usr)}`;
      await sql`insert into ${this.professorFragment} ${sql(prf)}`;
      return true;
    }).catch(_ => false);
  }
  private async registerAdm({ cpf, nome, dataNasc, sexo, email, senha, telefone }: AdministradorBlank): Promise<boolean> {
    const usr = { cpf, nome, dataNasc, sexo, email, senha, telefone };
    const adm = { cpf };
    return await this.sql.begin(async sql => {
      await sql`insert into ${this.tabelaFragment} ${sql(usr)}`;
      await sql`insert into ${this.administradorFragment} ${sql(adm)}`;
      return true;
    }).catch(_ => false);
  }
  public cadastrar(usuario: UsuarioBlank): Promise<UsuarioDB | null>;
  public cadastrar(aluno: AlunoBlank): Promise<AlunoDB | null>;
  public cadastrar(professor: ProfessorBlank): Promise<ProfessorDB | null>;
  public cadastrar(administrador: AdministradorBlank): Promise<AdministradorDB | null>;
  public async cadastrar(usuario: UsuarioBlank): Promise<UsuarioDB | null> {
    if (await this.consultarPorCPF(usuario.cpf))
      return null;

    const success: undefined | ((cpf: string) => Promise<UsuarioDB | null>) = await (async()=>{
      if (usuario instanceof AlunoBlank)
        return await this.registerAln(usuario) ? this.consultarAlunoPorCPF : undefined;
      if (usuario instanceof ProfessorBlank)
        return await this.registerPrf(usuario) ? this.consultarProfessorPorCPF : undefined;
      if (usuario instanceof AdministradorBlank)
        return await this.registerAdm(usuario) ? this.consultarAdministradorPorCPF : undefined;
      return undefined;
    })();

    if (success)
      return await success(usuario.cpf);
    return null;
  }

  private async updateUsr(sql: TransactionSQL, usr: UsuarioDB) {
    const { cpf, nome, dataNasc, sexo, email, senha, telefone } = usr;
    await sql`update ${this.tabelaFragment} set ${sql({ nome, dataNasc, sexo, email, senha, telefone })} where cpf = ${cpf}`;
  }
  private async updateAln(sql: TransactionSQL, aln: AlunoDB) {
    const { cpf, ativo, cpfProfessor, idPlano } = aln;
    await sql`update ${this.alunoFragment} set ${sql({ ativo, cpfProfessor, idPlano })} where cpf = ${cpf}`;
  }
  private async updatePrf(sql: TransactionSQL, prf: ProfessorDB) {
    const { cpf, cref, especialidade, ativo } = prf;
    await sql`update ${this.professorFragment} set ${sql({ cref, especialidade, ativo })} where cpf = ${cpf}`;
  }
  private async updateAdm(sql: TransactionSQL, adm: AdministradorDB) {
    // Nada novo
    const _ = { sql, adm };
  }
  public async atualizar(usuario: UsuarioDB): Promise<boolean | undefined> {
    if (!await this.consultarPorCPF(usuario.cpf))
      return undefined;

    await this.sql.begin(async sql => {
      await this.updateUsr(sql, usuario);
      if (usuario instanceof AlunoDB)
        return await this.updateAln(sql, usuario);
      if (usuario instanceof ProfessorDB)
        return await this.updatePrf(sql, usuario);
      if (usuario instanceof AdministradorDB) {
        return await this.updateAdm(sql, usuario);
      }
    }).then(_=>true,_=>false);
  }
}