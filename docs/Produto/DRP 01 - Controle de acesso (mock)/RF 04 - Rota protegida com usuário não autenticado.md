### RF 04 - Rota protegida com usuário não autenticado

__Descrição__
Como usuário não logado sou redirecionado para a tela de login

#### Critérios de aceite

**Cenário:** 
- **Dado** que o usuário não está autenticado
- **Quando** ele tenta acessar uma rota protegida (ex: `/dashboard`)
- **Então** ele é redirecionado para `/login` com uma mensagem ("Faça login primeiro")