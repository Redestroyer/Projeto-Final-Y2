import { ExercicioBlank, type ExercicioBase, type ExercicioDB } from "@/models";
import type { ExercicioRepository } from "@/repositories";

export class ExercicioService {
  constructor(
    public readonly repository: ExercicioRepository
  ) {}

  public async listarTodos(): Promise<ExercicioDB[]> {
    return await this.repository.listarTodos();
  }

  public async cadastrar(...dados: Omit<ExercicioBase, "id">[]): Promise<ExercicioDB[]> {
    return await this.repository.cadastrar(...dados.map(v => v instanceof ExercicioBlank ? v : new ExercicioBlank(v)));
  }

  public async atualizar(exercicio: ExercicioDB): Promise<boolean> {
    return await this.repository.atualizar(exercicio);
  }

  public async ativar(exercicio: ExercicioDB): Promise<boolean> {
    if (exercicio.ativo)
      return true;
    exercicio.ativo = true;
    if (!await this.atualizar(exercicio))
      exercicio.ativo = false;
    return exercicio.ativo;
  }
  public async desativar(exercicio: ExercicioDB): Promise<boolean> {
    if (!exercicio.ativo)
      return true;
    exercicio.ativo = false;
    if (!await this.atualizar(exercicio))
      exercicio.ativo = true;
    return !exercicio.ativo;
  }
}