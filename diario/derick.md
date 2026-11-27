# 2026-11-05
Modelei o [diagrama conceitual][].

# 2026-11-10
Modifiquei o [diagrama conceitual][] para adicionar atributos `Senha` a `Aluno` e `ID` a `Mensalidade`.
Inicializei o pacote de projeto Bun com comando `bun create hono@latest my-app`.
Criei as rotas de navegador e as views.

# 2026-11-12
Escrevi as telas de [entrada](/views/login.pug) e [cadastro](/views/signup.pug) de usuário.

# 2026-11-16
Melhorei [`formFields.tsx`](/src/components/formFields.tsx) e iniciei [`proxy.ts`](/src/app/proxy.ts).

# 2026-11-17
Modularizei as páginas.

# 2026-11-18
Iniciei o layout de `/dashboard`, incluindo um esqueleto para navegação.

# 2026-11-19
Iniciei a estilização das telas de autenticação.

# 2026-11-23
Fiz minha parte do [`banco.sql`][], melhorei as telas de autenticação e iniciei as classes de modelo e repositório.

# 2026-11-24
Criei [`.env`][], iniciei classes de serviço e adicionei mais classes de modelo e repositório.

# 2026-11-25
Continuei as classes de modelo, repositório e serviço e formatei o [`banco.sql`][] e [`relatorios.sql`][]

# 2026-11-26
Terminei o serviço de autenticação e continuei as [ações *React* de autenticação](/src/actions/auth.ts).

# 2026-11-27
Iniciei a modularizar a funcionalidade de repositório.

[diagrama conceitual]: /banco/Diagrama.Conceitual.brM3

[`banco.sql`]: /banco/sql/banco.sql
[`relatorios.sql`]: /banco/sql/relatorios.sql
[`.env`]: /.env.example
