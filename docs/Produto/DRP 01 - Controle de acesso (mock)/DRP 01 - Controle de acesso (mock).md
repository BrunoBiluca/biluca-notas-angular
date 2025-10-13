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

- [[RF 01 - Cadastro de usuário]]
- [[RF 02 - Login]]
- [[RF 03 - Logout]]
- [[RNF 01 - Rota protegida com usuário não autenticado]]

# Especificação de arquitetura

### Requisitos não funcionais

- [[RNF 01 - Rota protegida com usuário não autenticado]]

### Armazenamento local

> [!warning] Atualizar após a implementação, servirá de referência



# Esboços ou protótipos de UX

> [!warning] Atualizar após a implementação, servirá de referência
