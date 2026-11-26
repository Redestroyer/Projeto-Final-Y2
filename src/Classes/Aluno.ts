
import { Usuario } from "./Usuario";

export class Aluno extends Usuario {
    private matricula: string;
    private status: string;

    constructor(
        nome: string,
        cpf: string,
        email: string,
        telefone: string,
        matricula: string,
        status: string
    ) {
        super(nome, cpf, email, telefone);

        this.matricula = matricula;
        this.status = status;
    }

    getMatricula(): string {
        return this.matricula;
    }

    getStatus(): string {
        return this.status;
    }

    apresentar(): string {
        return `Aluno: ${this.nome} | Matrícula: ${this.matricula}`;
    }
    }
