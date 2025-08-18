### RF 01 - Nova nota

__Descrição__
Como usuário quero criar uma nova nota.

A criação da nota é feita de acordo com [[#Modelagem]] descrita.

**Campos obrigatórios:**
- título

**Campos opcionais:**
- conteúdo
- cor de fundo

**Campos preenchidos automaticamente:**
- id: cria quando a nota é criada
- criado em: quando a nota foi criada
- atualizado em: mesmo valor do criado em
- user_id: id do usuário autenticado

#### Critérios de aceite

**Cenário:** 
- **Dado** que o usuário está na página de notas
- **Quando** ele clica em "Nova Nota" e preenche título/conteúdo
- **Então** a nota é salva e aparece na listagem

**Cenários alternativos:**

- **Campo vazio**: Se o título estiver vazio, exibir erro ("Título obrigatório").
- **Limite de caracteres**: Se exceder 200 caracteres avisar o limite máximo.