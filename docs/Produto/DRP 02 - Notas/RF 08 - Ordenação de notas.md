### RF 08 - Ordenação de notas

__Descrição__
Como usuário quero ordenar automaticamente as notas pelos seus atributos ordenáveis.

#### Critérios de aceite

**Cenário:** Ordenação por título
- **Dado** que o usuário está na tela de notas
- **Quando** ele seleciona a opção de ordenação por título
- **Então** as notas são ordenadas de forma alfabética

**Cenário:** Ordenação por título decrescente
- **Dado** que o usuário está na tela de notas
- **E** a opção de ordenação por título foi selecionada
- **Quando** ele seleciona a opção de ordenação por título (novamente)
- **Então** as notas são ordenadas de forma alfabética decrescente

**Cenário:** Ordenação por data de criação
- **Dado** que o usuário está na tela de notas
- **Quando** ele seleciona a opção de ordenação por data de criação
- **Então** as notas são ordenadas da mais recente para a mais antiga

**Cenário:** Ordenação por data de criação decrescente
- **Dado** que o usuário está na tela de notas
- **E** a opção de ordenação por data de criação foi selecionada
- **Quando** ele seleciona a opção de ordenação por data de criação (novamente)
- **Então** as notas são ordenadas da mais antiga para a mais recente

**Cenário:** Manutenção da ordenação
- **Dado** que estou na tela de Notas
- **E** já existe uma ordenação selecionada
- **Quando** adiciono/edito uma nota
- **Então** ela deve ser inserida de acordo com a ordenação selecionada