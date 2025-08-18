# DRP 03 - Temas

> [!important] Resumo
> Deve ser possível alterar entre diversos temas previamente registrados pela própria aplicação.
> Nessa funcionalidade será considerada apenas as cores do tema.

Objetivos:

- Cada usuário pode ter uma estética da aplicação diferente, o que permite maior personalização da aplicação

# Contexto

### Hipóteses

- A partir da implementação de temas é possível abordar vários conceitos de Frontend:
	- Variáveis globais de estilização
	- Gerenciamento de estado global
	- Entrada de configurações por usuário

### Restrições

- Pelo máximo dois temas serão definidos na aplicação

### Dependências

- [[DRP 02 - Notas]] implementado, já que aqui serão definidos todos os principais elementos que serão estilizados

### Dúvidas

- Nenhuma

### Fora do escopo

- Configurar qualquer aspecto estético além de cores

### Referências

- Temas claro/escuro
- Temas de IDEs de desenvolvimento

# Usuários

- Usuário: usuário autenticado

# Requisitos

**Índice**

- [[RF 01 - Exibição dos temas preestabelecidos]]
- [[RF 02 - Troca de tema]]
- [[RF 03 - Manter o último tema escolhido]]

# Especificação de arquitetura

## Modelagem

#### Configuração

- Cada tema deve definir:
    - Cores primárias (`primary`).
    - Cores secundárias (`secondary`).
    - Cores de fundo (`background`).
    - Cores de texto (`text`).
    - Cores de bordas (`border`).

## Requisitos não funcionais

- [[RNF 01 - Performance]]
- [[RNF 02 - Visibilidade]]

# Qualidade

#### Acessibilidade

Oferecer um tema **high-contrast** (opcional para acessibilidade).

# Esboços ou protótipos de UX

- Tela: nome da tela
- Imagem da tela
- Explicação de cada elemento da tela
- Explicação dos comportamentos da tela