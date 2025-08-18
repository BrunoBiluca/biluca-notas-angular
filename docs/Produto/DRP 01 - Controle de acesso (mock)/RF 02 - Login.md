### RF 02 - Login

__Descrição__
Eu como usuário registrado quero poder logar ao site para começar a interagir com o mesmo com meu email e senha.

#### Critérios de aceite

**Cenário:** Sucesso
- Dado que o usuário está na página de login
- Quando ele entra com seu email e senha
- Então ele é redirecionado para a página de Notas

**Cenário:** Credenciais incorretas
- **Dado** que o usuário está registrado (a partir do email)
- **Quando** ele entra com a senha incorreta
- **Então** é exibida uma mensagem explicitando o problema

**Cenário:** Usuário não existe
- **Dado** que o usuário não existe (email não encontrado)
- **Quando** quando ele as credenciais
- **Então** é exibida uma mensagem explicitando o problema
- **E** é dada a opção de fazer o cadastro, utilizando dados já preenchidos