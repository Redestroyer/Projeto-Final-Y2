import { UsuarioDB } from "@/models";
import type { UsuarioRepository } from "@/repositories";

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
  public autenticar(cpf: UsuarioDB["cpf"], senha: string): Promise<boolean | undefined>
  public autenticar(usuario: UsuarioDB, senha: string): Promise<boolean>
  public async autenticar(usuario: UsuarioDB | UsuarioDB["cpf"], senha: string): Promise<boolean | undefined> {
    if (!(usuario instanceof UsuarioDB)) {
      const user = await this.usuarios.consultarPorCPF(usuario);
      if (!user)
        return undefined;
      usuario = user;
    }
    
    return await this.autenticador.autenticar(usuario.senha, senha);
  }
}