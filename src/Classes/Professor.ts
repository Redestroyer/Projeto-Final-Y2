
import { Usuario } from "./Usuario";

export class Professor extends Usuario {
    private especialidade: string;
    private cref: string;

    constructor(
        nome: string,
        cpf: string,
        email: string,
        telefone: string,
        especialidade: string,
        cref: string
    ) {
        super(nome, cpf, email, telefone);

        this.especialidade = especialidade;
        this.cref = cref;
    }

    getEspecialidade(): string {
        return this.especialidade;
    }

    getCref(): string {
        return this.cref;
    }

    apresentar(): string {
        return `Professor: ${this.nome} | Especialidade: ${this.especialidade}`;
    }
    }
