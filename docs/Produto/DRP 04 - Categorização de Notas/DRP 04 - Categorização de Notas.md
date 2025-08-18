# DRP 04 - Categorização de Notas

> [!important] Resumo
> Categorizar notas permitem aos usuários organizar melhor a exibição.


Objetivos:

- Categorizar notas para melhorar a exibição, permitindo organização por contexto.

# Contexto

### Hipóteses

- A partir da implementação de categorias conceitos mais complexos de agrupamento podem ser explorados
- A implementação de categorias irá permitir a prática de conceitos mais avançados de gerenciamento de estado.
	- Isso porque é uma estrutura que envolve várias notas simultaneamente.

### Restrições

- Todas as informações são armazenadas apenas localmente

### Dependências

- [[DRP 02 - Notas]]
	- Irá servir como base para as categorias

### Fora do escopo

- Armazenamento externo

### Referências

- Tags do Notion

# Usuários

- Usuário: usuário autenticado

# Requisitos

- [[RF 01 - Atribuição de categoria a Nota]]
- [[RF 02 - Agrupamento por categoria]]
- [[RF 03 - Exibição das categoria]]
- [[RF 04 - Remoção de categoria]]
- [[RF 05 - Filtro]]

# Especificação de arquitetura

## Modelagem

### Composição de uma categoria

Um categoria tem os seguintes campos:

```js
categoria = {
	nome: "categoria A",
	criada_em: date
}
```

Relação com uma Nota:

```js
nota = {
	...nota,
	categoria = categoria | undefined
};
```

## Requisitos não funcionais

- [[RNF 01 - Atualização da exibição]]

# Qualidade



# Esboços ou protótipos de UX

#### Exemplo de formulário para adição de categorias

![[Exemplo de adição de categorias a uma nota.png|Exemplo de adição de categorias a uma nota]]