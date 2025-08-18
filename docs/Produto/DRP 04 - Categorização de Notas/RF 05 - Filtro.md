### RF 05 - Filtro

__Descrição__
Como usuário quero poder selecionar uma única categoria a fim de visualizar apenas notas dessa categoria.

#### Critérios de aceite

**Cenário:** Filtro por categoria
- **Dado** que estou a página de notas
- **Quando** seleciono uma categoria para filtrar
- **Então** então apenas notas associadas a essa categoria são exibidas
- **E** a categoria selecionada é destacada

**Cenário:** Remoção de filtro de uma categoria selecionada
- **Dado** que estou na página de notas
- **E** já existem categorias como filtro
- **Quando** seleciona a opção de limpar o filtro referente apenas a essa categoria
- **Se** existem mais categorias selecionadas
	- **Então** então apenas as notas dessa categoria não são mais exibidas
- **Se não** existem mais categorias selecionadas
	- **Então** todas as notas são exibida

**Cenário:** Remoção dos filtros
- **Dado** que estou a página de notas
- **E** já existe uma categoria selecionada como filtro
- **Quando** seleciono a opção de limpar os filtros
- **Então** então todas as notas são exibidas