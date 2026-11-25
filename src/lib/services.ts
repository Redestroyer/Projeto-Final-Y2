import { password } from "bun";

import { ExercicioRepository, PlanoRepository, UsuarioRepository } from "@/repositories";
import { AutenticacaoService as $s1, ExercicioService as $s2, PlanoService as $s3 } from "@/services";

import sql from "./sql";

const exercicioRepository = new ExercicioRepository(sql);
const planoRepository = new PlanoRepository(sql);
const usuarioRepository = new UsuarioRepository(sql);

export const AutenticacaoService = new $s1(usuarioRepository, {
  async hashear(senha) {
    return await password.hash(senha, "argon2id");
  },
  async autenticar(hash, senha) {
    return await password.verify(senha, hash, "argon2id");
  },
})
export const ExercicioService = new $s2(exercicioRepository);
export const PlanoService = new $s3(planoRepository);
