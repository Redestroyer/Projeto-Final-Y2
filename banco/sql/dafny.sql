insert into Usuario (cpf,nome, dataNasc, sexo,email, senha, telefone)
 Values ('12345678901', "Maria", '2008-09-01', "f","maria@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WDVGcUpzd3g0QWlMWE50Yw$SjQdJQK5JO6BRL4jKBh6Ug", "82988776655"),
  ('98765432100', "João", '2000-12-20', "m","joao@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WDVGcUpzd3g0QWlMWE50Yw$xEVHCEAR9phmG65RMSuo3A", "80877661134"),
  ('12345678910', "ana", '2001-11-05', "f","ana@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$WDVGcUpzd3g0QWlMWE50Yw$yYRspFxkd7su7ad8XlI+CA", "55988332277"),
  ("14961514454", "Derick Davi Veríssimo Marinho", "2009-10-02", "m", "ddvm1@aluno.ifal.edu.br", "$argon2id$v=19$m=16,t=2,p=1$cjZ1SmRuRkE1WG1UaTlJQQ$WjF0yaSqUI8uEICjSLezMw", "82991911038"),
 ("13743140489", "Dafny Heloá da Silva Lins", "2009-12-06", "f", "dhsl1@aluno.ifal.edu.br", "$argon2id$v=19$m=16,t=2,p=1$cjZ1SmRuRkE1WG1UaTlJQQ$MvfDywo0TCIE+u8hqwE3ag", "82988752337"),
 ("15342747406", "Hiago Alves Barboza", "2009-07-08", "m", "hab2@aluno.ifal.edu.br", "$argon2id$v=19$m=16,t=2,p=1$cjZ1SmRuRkE1WG1UaTlJQQ$HuH06V9S+0L8nyzV0RVmQg", "82999270773");
 
insert into Administrador (cpf) 
  values ("14961514454"),
 ("13743140489"),
 ("15342747406");
 
insert into Professor (cpf, cref, especialidade, ativo)
 values ('98765432100', 'CREF12345', 'Musculação', b'1'),
 ('12345678910', 'CREF56789', 'Musculação', b'1');
 
insert into Plano (nome, duracaoMeses, valor, diaVencimento, cobranca, ativo)
 values ('Mensal', 1, 99.90, 10, 'Mensal', b'1'),
 ('Semestral', 6, 499.90, 15, 'Semestral', b'1')