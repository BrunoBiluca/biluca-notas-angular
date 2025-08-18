### RF 03 - Detalhes da nota

__Descrição__
Como usuário quero selecionar uma nota a fim de destacar a nota e conseguir visualizar todas as suas informações.

#### Critérios de aceite

**Cenário:** Seleção de uma nota
- **Dado** que estou na página de exibição de notas
- **Quando** seleciono uma nota
- **Então** ela é trazida em primeiro plano e todas as informações são exibidas em detalhes

**Cenário alternativo:** Seleção de nota removida
- **Dado** que estou logado
- **Quando** coloco o endereço url de uma nota que foi removida
- **Então** deve ser exibida uma mensagem de que a nota foi removida e não existe mais