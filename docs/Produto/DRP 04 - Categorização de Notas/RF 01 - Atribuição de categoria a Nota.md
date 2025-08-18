### RF 01 - Atribuição de categoria a Nota

__Descrição__
Como usuário quero ter a opção de categorizar uma nota com uma tag específica a fim de aplicar mais uma forma de informação para categorizar a nota.

#### Critérios de aceite

**Cenário:** Atribuição de categoria da Nota
- **Dado** que estou no formulário de criação/edição de Nota
- **Quando** quando entro com uma categoria
- **Então** essa nota é cadastrada com a categoria definida

**Cenário:** Atribuição de categoria existente na Nota
- **Dado** que estou no formulário de criação/edição de Nota
- **Enquanto** adiciono caracteres na entrada
- **São** exibidas as categorias com o mesmo conjunto de caracteres
- **E** tenho a possibilidade de escolher uma das categorias exibidas