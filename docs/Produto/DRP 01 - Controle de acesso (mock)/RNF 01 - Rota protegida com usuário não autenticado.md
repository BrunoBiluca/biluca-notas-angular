# RNF 01 - Rotas da aplicação são protegidas

Usuário não autenticados não devem ter acesso a rotas internas da aplicação.

Rotas acessadas por qualquer usuário:

- Login
- Cadastro de usuário

Demais rotas são protegidas, o usuário deve então ser direcionado para a tela de login caso tente acessar qualquer outra rota.

#### Critérios de aceite

**Cenário:** 
- **Dado** que o usuário não está autenticado
- **Quando** ele tenta acessar uma rota protegida (ex: `/dashboard`)
- **Então** ele é redirecionado para `/login` com uma mensagem ("Faça login primeiro")