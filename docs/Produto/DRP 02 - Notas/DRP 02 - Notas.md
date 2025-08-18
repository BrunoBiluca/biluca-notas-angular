# DRP 02 - Notas

> [!important] Resumo
> Notas são a funcionalidade principal da aplicação.
> Cada usuário tem o seu conjunto de notas que podem servir para lembrar de coisas, como notas de aulas, cursos...

Objetivos:

- Permitir aos usuários gerenciar as suas notas

# Contexto

Gerenciamento de notas.

### Hipóteses

- A partir da implementação de Notas serão trabalhados vários conceitos de Frontend
	- Formulários
	- Atualização de itens e diferentes exibições

### Restrições

- Todo as notas serão registradas apenas em Localstorage
- notas com imagens, será necessário verificar como fazer isso de forma local

### Dependências

- [[DRP 01 - Controle de acesso (mock)]]
	- As notas são associadas ao usuário autenticado

### Dúvidas

- Nenhuma

### Fora do escopo

- Registro externo

### Referências

- [Google Keep](https://keep.google.com/)

# Usuários

- Usuário: usuário autenticado

# Requisitos

**Índice**

- [[RF 01 - Nova nota]]
- [[RF 02 - Exibição de notas]]
- [[RF 02.01 - Exibição de todas as notas em Lista]]
- [[RF 02.02 - Exibição de todas as notas em Grade]]
- [[RF 02.03 Comportamento das notas na exibição]]
- [[RF 03 - Detalhes da nota]]
- [[RF 04 - Edição de nota]]
- [[RF 05 - Remoção de nota]]
- [[RF 06 - Pesquisa por nota]]
- [[RF 07 - Fixar nota]]
- [[RF 07.01 - Desafixar nota]]
- [[RF 08 - Ordenação de notas]]
- [[RF 09 - Ordenação manual de Notas]]
- [[RF 10 - Adição de imagem]]

# Especificação de arquitetura

## Modelagem

### Composição de uma nota

Uma nota é definida pelos seguintes campos:

```js
nota = {
	id: "1",
	title: "Reunião com cliente",
	content: "Discutir requisitos do projeto",
	color: "#FFEE93",
	isPinned: true,
	createdAt: "2024-01-20T10:00:00Z",
	updatedAt: "2024-01-20T10:30:00Z",
	user_id: <id_usuário>
};
```

## Requisitos não funcionais

- [[RNF 01 - Carregamento de grande quantidade de Notas]]

# Esboços ou protótipos de UX

#### Alteração entre modos de exibição

Sempre que uma modo novo mode de exibição for escolhido, as notas devem ser organizadas na tela com uma animação mais natural possível.

As notas não devem desaparecer entre os modos de exibição.