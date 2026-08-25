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

Cypress.Commands.add('login', (

    email = Cypress.env('USER_EMAIL'), 
    password = Cypress.env('USER_PASSWORD')) => {
        
    cy.session(['minha-sessao', email], () => {
        LoginPage.paginaLogin()
        LoginPage.login(email, password)
        LoginPage.validatePageInitial()
            .should('be.visible')

    }, {
        validate() {
            cy.intercept('GET', '**/api/v1/products*').as('validaSessao')
            cy.visit('/products')
            cy.wait('@validaSessao')
                .its('response.statusCode')
                .should('eq', 200)
        }
    })
})
// Uso em qualquer teste:
//beforeEach(() => {
//cy.login()
//cy.visit('/ -que-quero-testar')
//})