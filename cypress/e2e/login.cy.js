import LoginPage from '../page/LoginPage'

describe('Realizar Login', () => {

    const email = Cypress.env('USER_EMAIL')
    const password = Cypress.env('USER_PASSWORD')

    context('Pagina de login disponível', () => {
        it('deve acessar o site e exibir a tela de login', () => {
            cy.paginaLogin()
        })
    })
    context('Credenciais válidas', () => {
        it('deve autenticar com credenciais válidas', () => {
            cy.paginaLogin()
            cy.login()
        })
    })

    context('Credenciais inválidas', () => {
        it('deve exibir erro para email invalido', () => {
            cy.paginaLogin()
            LoginPage.preencherEmail('teste@teste.com')
            LoginPage.preencherSenha(password)
            LoginPage.clickLoginButton()
            LoginPage.messageErrorEmail()
                .contains('Usuário não encontrado. Verifique o email ou cadastre-se.')
        })
        it.only('deve exibir erro para senha inválida', () => {
            cy.paginaLogin()
            LoginPage.preencherEmail(email)
            LoginPage.preencherSenha('senhaerrada')
            LoginPage.clickLoginButton()
            LoginPage.messageErrorSenha()
                .contains('Email ou senha inválidos')
        })
        it('deve exibir erro para login apenas com senha', () => {
            cy.paginaLogin()
            cy.get('[data-testid="password-input"]').type(Cypress.env('USER_PASSWORD'))
            cy.get('[data-testid="login-button"]').click()
            cy.get('[data-testid="password-error"]')
                .should('be.visible')
                .and('contain', 'Email e senha são obrigatórios')
        })
    })

    it('cy.login() deve funcionar via cy.session()', () => {
        cy.login()
        cy.intercept('GET', '**/products').as('getProducts')
        cy.visit('/products')
        cy.wait('@getProducts').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })
    })
})