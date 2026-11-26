
export class Usuario {
    protected nome: string;
    protected cpf: string;
    protected email: string;
    protected telefone: string;

    constructor(
        nome: string,
        cpf: string,
        email: string,
        telefone: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
    }

    getNome(): string {
        return this.nome;
    }

    getCpf(): string {
        return this.cpf;
    }

    getEmail(): string {
        return this.email;
    }

    getTelefone(): string {
    return this.telefone;
    }

    apresentar(): string {
    return `Usuário: ${this.nome}`;
    }
}
