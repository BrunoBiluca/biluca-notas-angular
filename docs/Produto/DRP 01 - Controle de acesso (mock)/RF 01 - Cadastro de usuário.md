### RF 01 - Cadastro de usuário

__Descrição__
Eu como usuário não registrado quero poder me registrar para conseguir fazer o Login.

Informações obrigatórias:

- Nome
- Email
- Password

Informações adicionadas automaticamente:

- Criado em: quando o registro foi feito

Informações que definem um formulário inválido:
- Qualquer um dos campos obrigatórios vazio
- Formato de email inválido
- Senha com menos de 6 dígitos

#### Critérios de aceite

- **Cenário:** Sucesso
	- Dado que o usuário está na página de cadastro
	- Quando ele entra com um formulário válido
	- Então ele pode ser registrado
	- E é redirecionado a página de Login

- **Cenário:** Formulário inválido
	- Dado que o usuário apresentou informações inválidas no formulário
	- Quando ele submete o formulário
	- Então são apresentadas mensagem de erro para cada informação independentemente

- **Cenário alternativo:** Já existe usuário com esse username
	- Dado que o usuário apresentou um username
	- Quando ele já existe
	- Então deve ser apresenta uma mensagem indicando que o username já existe