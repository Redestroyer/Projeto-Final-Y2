import { AdministradorBlank, AdministradorDB, AlunoBlank, AlunoDB, ProfessorBlank, ProfessorDB, type UsuarioBlank, UsuarioDB } from "@/models";
import type { UsuarioRepository } from "@/repositories";
import { EncryptJWT, jwtDecrypt } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET);
type Payload = {
  sub: UsuarioDB["cpf"];
  name: UsuarioDB["nome"];
  email: UsuarioDB["email"];
}

export interface Autenticador {
  hashear(senha: string): Promise<string>;
  autenticar(hash: string, senha: string): Promise<boolean>;
}
export class AutenticacaoService {
  constructor(
    public readonly usuarios: UsuarioRepository,
    public readonly autenticador: Autenticador
  ) {}

  public async hashearSenha(senha: string): Promise<string> {
    return this.autenticador.hashear(senha);
  }

  public cadastrar(usuario: AlunoBlank): Promise<AlunoDB | null>;
  public cadastrar(usuario: ProfessorBlank): Promise<ProfessorDB | null>;
  public cadastrar(usuario: AdministradorBlank): Promise<AdministradorDB | null>;
  public async cadastrar(usuario: UsuarioBlank): Promise<UsuarioDB | null> {
    if (await this.usuarios.consultarPorCPF(usuario.cpf))
      return null;

    usuario.senha = await this.hashearSenha(usuario.senha);
    return await this.usuarios.cadastrar(usuario);
  }

  private async getUser(user: UsuarioDB | UsuarioDB["cpf"]): Promise<UsuarioDB | null> {
    if (user instanceof UsuarioDB)
      return user;
    return await this.usuarios.consultarPorCPF(user);
  }

  public async autenticar(usuario: UsuarioDB | UsuarioDB["cpf"], senha: string): Promise<string | null> {
    const user = await this.getUser(usuario);
    if (!user) return null;
    usuario = user
    
    const auth = await this.autenticador.autenticar(usuario.senha, senha);
    if (auth)
      return null;

    const token = await new EncryptJWT({ sub: usuario.cpf, email: usuario.email, name: usuario.nome } satisfies Payload)
      .setProtectedHeader({ alg: "A256KW", enc: process.env.SECRET })
      .setIssuedAt()
      .setExpirationTime("30min")
      .encrypt(secret)
    ;
    return token;
  }

  public async verificarFicha(ficha: string): Promise<UsuarioDB | null> {
    return await jwtDecrypt<Payload>(ficha, secret)
      .then(
        async result => {
          const user = await this.usuarios.consultarPorCPF(result.payload.sub);
          if (!user)
            return null;
          const adm = await this.usuarios.consultarAdministradorPorUsuário(user);
          if (adm) return adm;
          const prf = await this.usuarios.consultarProfessorPorUsuário(user);
          if (prf) return prf;
          const aln = await this.usuarios.consultarAlunoPorUsuário(user);
          if (aln) return aln;
          return user;
        },
        _ => null
      )
    ;
  }

  public async alterarSenha(usuario: UsuarioDB | UsuarioDB["cpf"], senhaVelha: string, senhaNova: string): Promise<UsuarioDB | null> {
    const user = await this.getUser(usuario);
    if (!user) return null;
    usuario = user

    if (!await this.autenticador.autenticar(usuario.senha, senhaVelha))
      return null;

    const reversal = usuario.senha;
    usuario.senha = await this.autenticador.hashear(senhaNova);
    if (await this.usuarios.atualizar(usuario))
      return usuario;
    usuario.senha = reversal;
    return null;
  }
}
