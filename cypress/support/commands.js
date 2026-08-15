// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('paginaLogin', () => {
    cy.visit('/')
    // Substitua pelo seletor real do campo os campos do site
    cy.get('[data-testid="email-input"]').should('be.visible')
    cy.get('[data-testid="password-input"]').should('be.visible')
    cy.get('[data-testid="login-button"]').should('be.visible')
})


Cypress.Commands.add('login', () => {
    cy.session('minha-sessao', () => {
    cy.paginaLogin()
    // Substitua com os seletores do SEU site
    cy.get('[data-testid="email-input"]').type(Cypress.env('USER_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('USER_PASSWORD'))
    cy.get('[data-testid="login-button"]').click()
    //valida se esta na pagina logada
    cy.get('[class="text-xl text-pink-100 mb-4"]',).contains('Lista de Produtos (Admin View)')

    }, {
        validate() {
            //Valida se a sessão ainda é válida antes de cada teste
            cy.intercept('GET', '**/products').as('validaSessao')
            cy.visit('/products')
            cy.wait('@validaSessao').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
            })
        }
    })
})
// Uso em qualquer teste:
//beforeEach(() => {
//cy.login()
//cy.visit('/ -que-quero-testar')
//})