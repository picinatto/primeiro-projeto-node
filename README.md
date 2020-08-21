# Recuperação de senha

**RF(RegrasFuncionais)**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF(RegrasNãoFuncionais)**

- Utilizar Mailtrap para testar envios de e-mail em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN(RegrasDeNegócio)**

- O link enviado por e-mail para resetar senha, deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário deve confirmar a nova senha;


# Painel do prestador

**RF**

**RNF**

**RN**

# Agendamento de serviços

**RF**

**RNF**

**RN**
