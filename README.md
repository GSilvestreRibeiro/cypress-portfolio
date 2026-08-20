# Cypress Portfolio

Projeto de automação de testes end-to-end com Cypress, focado na validação funcional e fluxo de autenticação de uma aplicação web.

## Objetivo

Validar o comportamento da aplicação em cenários funcionais de regressao.

## Tecnologias

- Cypress
- JavaScript
- Node.js
- npm

## Pré-requisitos

Antes de executar o projeto, verifique se você possui instalado:

- Node.js 22+
- Cypress 15.21.0
- npm 10+
- Navegador compatível com Cypress (Chrome, Edge, Electron, Firefox)


## Instalação

Clone o projeto e instale as dependências:

```bash
npm install
```

## Configuração do ambiente

Crie um arquivo `cypress.env.json` na raiz do projeto com as variáveis necessárias, por exemplo:

```json
{
  "USER_EMAIL": "seu-email@teste.com",
  "BASE_URL": "https://seu-site.com"
}
```

Também é importante configurar o `baseUrl` no Cypress, caso queira usar `cy.visit('/')` e `cy.visit('/products')`:

```js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://seu-site.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
```

## Estrutura do projeto

```text
cypress-portfolio/
├── cypress/
│   ├── e2e/
│   │   └── validacao-ambiente.cy.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── cypress.env.json
├── package.json
└── README.md
```

## Como executar os testes

Abrir o Cypress em modo interativo:

```bash
npx cypress open
```

## Casos de teste cobertos até o momento

O projeto atual valida os seguintes cenários:

- acesso ao site e visualização da tela de login
- autenticação com usuário e senha válidos
- retorno de erro para credenciais inválidas
- uso de `cy.session()` em um fluxo de login
- validação de resposta HTTP ao acessar `/products`

## Observações

- Sempre confirme se o `baseUrl` está corretamente configurado antes de usar `cy.visit('/')`.
- Os testes foram estruturados para validar comportamento real da aplicação e a experiência de autenticação do usuário.
- O uso de `cy.session()` ajuda a reutilizar a sessão autenticada entre casos de teste.

## Autor

- Guilherme Silvestre

Projeto em desenvolvimento para estudo e prática de automação com Cypress.