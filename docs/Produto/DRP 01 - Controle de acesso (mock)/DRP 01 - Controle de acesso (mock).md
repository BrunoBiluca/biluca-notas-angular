# DRP 01 - Controle de acesso (mock)

> [!important] Resumo
> Controle de acesso permite ao usuário registrado interagir com a a plataforma de Notas.
> Nada pode ser feito sem acesso.

Objetivos:

- Liberar funcionalidades para o usuários

# Contexto

O controle de acesso garante que o usuário está registrado na plataforma antes de interagir com ela.

### Hipóteses

- A partir da implementação de controle de acesso (mock) será possível trabalhar esse conjunto de habilidade para o uso em sistemas reais futuros
- Conjunto de habilidades trabalhadas
	- Fluxos de autenticação (rotas)
	- Tratamento de erros
	- Manipulação de formulários
	- Gerenciamento de estado global

### Restrições

- O controle de acesso será feito a partir de configurações pré-configuradas no próprio projeto.

### Fora do escopo

- Qualquer tipo de integração com serviços reais

# Usuários

- Usuário não registrado
- Usuário registrado não autenticado
- Usuário autenticado

# Requisitos

**Índice**

- [[RF 01 - Cadastro de usuário]]
- [[RF 02 - Login]]
- [[RF 03 - Logout]]
- [[RF 04 - Rota protegida com usuário não autenticado]]

# Especificação de arquitetura

#### Configuração pré-estabelecida

Será definida uma configuração pré-estabelecida em nível de projeto de usuários registrados que podem fazer o login.

```js
// Exemplo de configuração de usuários
const users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "admin123",
  },
  {
    id: 2,
    email: "user@example.com",
    password: "user123",
  },
  {
    id: 3,
    email: "inactive@example.com",
    password: "teste123",
  },
];
```


# Esboços ou protótipos de UX

> [!warning] Atualizar após a implementação, servirá de referência
