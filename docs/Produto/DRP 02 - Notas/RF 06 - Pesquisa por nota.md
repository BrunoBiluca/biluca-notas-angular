### RF 06 - Pesquisa por nota

__Descrição__
Como usuário quero poder buscar por notas a partir de palavras contidas no título ou no conteúdo.

#### Critérios de aceite

 - Barra de pesquisa deve estar disponível em qualquer local da página de Notas
	 - Um bom lugar é o cabeçalho

**Cenário:** Busca por palavras
- **Dado** que estou na página de Notas
- **Quando** escrevo uma palavra (mínimo 3 caracteres)
- **Então** então apenas notas que tem essa palavra no seu título ou conteúdo são exibidas
- **E** essa palavra é destacada na exibição

**Cenário:** Adição de notas com busca ativa
- Dado que estou na página de Notas 
- E já tem um termo de busca
- Quando adiciono uma nota
- Se ela tem o termo da busca deve aparecer
- Senão ela não deve aparecer

**Cenário:** Palavra não existe
- **Dado** que estou na página de Notas
- **Quando** escrevo uma palavra que não existe em nenhuma nota (nem título, nem conteúdo)
- **Então** é exibida uma mensagem de que não foi encontrada nenhuma nota