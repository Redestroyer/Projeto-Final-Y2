import { PlanoBlank, type PlanoBase, type PlanoDB } from "@/models";
import type { PlanoRepository } from "@/repositories";

export class PlanoService {
  constructor(
    public readonly repository: PlanoRepository
  ) {}

  public async listarTodos(): Promise<PlanoDB[]> {
    return await this.repository.listarTodos();
  }

  public async cadastrar(...dados: Omit<PlanoBase, "id">[]): Promise<PlanoDB[]> {
    return await this.repository.cadastrar(...dados.map(v => v instanceof PlanoBlank ? v : new PlanoBlank(v)));
  }
  
  public async atualizar(plano: PlanoDB): Promise<boolean> {
    return await this.repository.atualizar(plano);
  }

  public async ativar(plano: PlanoDB): Promise<boolean> {
      if (plano.ativo)
        return true;
      plano.ativo = true;
      if (!await this.atualizar(plano))
        plano.ativo = false;
      return plano.ativo;
    }
    public async desativar(plano: PlanoDB): Promise<boolean> {
      if (!plano.ativo)
        return true;
      plano.ativo = false;
      if (!await this.atualizar(plano))
        plano.ativo = true;
      return !plano.ativo;
    }
}