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
import LoginPage from '../page/LoginPage'

Cypress.Commands.add('login', () => {
    cy.session('minha-sessao', () => {
    LoginPage.paginaLogin()
    LoginPage.login()

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