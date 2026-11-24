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
}