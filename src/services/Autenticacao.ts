import { UsuarioDB } from "@/models";
import type { UsuarioRepository } from "@/repositories";
import { EncryptJWT } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET);
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
  public autenticar(cpf: UsuarioDB["cpf"], senha: string): Promise<string | undefined>
  public autenticar(usuario: UsuarioDB, senha: string): Promise<string | undefined>
  public async autenticar(usuario: UsuarioDB | UsuarioDB["cpf"], senha: string): Promise<string | undefined> {
    if (!(usuario instanceof UsuarioDB)) {
      const user = await this.usuarios.consultarPorCPF(usuario);
      if (!user)
        return undefined;
      usuario = user;
    }
    
    const auth = await this.autenticador.autenticar(usuario.senha, senha);
    if (auth)
      return undefined;

    const token = await new EncryptJWT({ sub: usuario.cpf, email: usuario.email, name: usuario.name })
      .setProtectedHeader({ alg: "A256KW", enc: process.env.SECRET })
      .setIssuedAt()
      .setExpirationTime("30min")
      .encrypt(secret)
    ;
    return token;
  }
}
