### RF 10 - Adição de imagem

__Descrição__
Como usuário quero adicionar imagens as minhas notas.

#### Critérios de aceite

**Cenário:** Imagem anexada
- **Dado** que estou na criação de notas
- **Quando** adiciono uma imagem como anexo
- **Então** nos detalhes da nota a imagem aparece em tela cheia
- **E** na tela de notas aparece apenas a miniatura da imagem

**Cenário:**  Cancelar imagem
- **Dado** que estou na criação de notas
- **E** adiciona uma imagem como anexo
- **Então** tenho a opção de cancelar aquela imagem
- **E** ela não será anexada quando a nota for criada

**Cenário:** Carregamento inicial
- **Dado** que estou na página de notas
- **E** a nota foi criada com imagens
- **Então** as imagens devem ser apresentadas