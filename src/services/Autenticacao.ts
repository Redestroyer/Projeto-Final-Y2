import { UsuarioDB } from "@/models";
import type { UsuarioRepository } from "@/repositories";
import { EncryptJWT, jwtDecrypt } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET);
type Payload = {
  sub: UsuarioDB["cpf"];
  name: UsuarioDB["name"];
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
  public autenticar(cpf: UsuarioDB["cpf"], senha: string): Promise<string | null>
  public autenticar(usuario: UsuarioDB, senha: string): Promise<string | null>
  public async autenticar(usuario: UsuarioDB | UsuarioDB["cpf"], senha: string): Promise<string | null> {
    if (!(usuario instanceof UsuarioDB)) {
      const user = await this.usuarios.consultarPorCPF(usuario);
      if (!user)
        return null;
      usuario = user;
    }
    
    const auth = await this.autenticador.autenticar(usuario.senha, senha);
    if (auth)
      return null;

    const token = await new EncryptJWT({ sub: usuario.cpf, email: usuario.email, name: usuario.name } satisfies Payload)
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
          return user;
        },
        _ => null
      );
  }
}
