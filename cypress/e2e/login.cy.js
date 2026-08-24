import LoginPage from '../page/LoginPage'

describe('Autenticação de usuário', () => {

    const email = Cypress.env('USER_EMAIL')
    const password = Cypress.env('USER_PASSWORD')

    context('Pagina de login disponível', () => {
        it('deve acessar o site e exibir a tela de login', () => {
            LoginPage.paginaLogin()
            LoginPage.getEmailInput().should('be.visible')
            LoginPage.getPasswordInput().should('be.visible')
            LoginPage.getLoginButton().should('be.visible')
        })
    })
    context('Credenciais válidas', () => {
        it('deve autenticar com credenciais válidas', () => {
            LoginPage.paginaLogin()
            LoginPage.login(email, password)
            LoginPage.validatePageInitial()
                .should('be.visible').and('contain', 'Lista de Produtos (Admin View)')
        })
    })

    context('Credenciais inválidas', () => {
        it('deve exibir erro para email invalido', () => {
            LoginPage.paginaLogin()
            LoginPage.preencherEmail('teste@teste.com')
            LoginPage.preencherSenha(password)
            LoginPage.clickLoginButton()
            LoginPage.messageErrorEmail()
                .should('have.text', 'Usuário não encontrado. Verifique o email ou cadastre-se.')
                .and('be.visible')
        })
        it('deve exibir erro para senha inválida', () => {
            LoginPage.paginaLogin()
            LoginPage.preencherEmail(email)
            LoginPage.preencherSenha('senhaerrada')
            LoginPage.clickLoginButton()
            LoginPage.messageErrorSenha()
                .should('have.text', 'Email ou senha inválidos')
                .and('be.visible')
        })
        it('deve exibir erro para login apenas com senha', () => {
            LoginPage.paginaLogin()
            LoginPage.preencherSenha(password)
            LoginPage.clickLoginButton()
            LoginPage.messageErrorSenha()
                .should('have.text', 'Email e senha são obrigatórios')
                .and('be.visible')
        })
    })

    it('cy.login() deve funcionar via cy.session()', () => {
        LoginPage.paginaLogin()
        LoginPage.login(email, password)
        cy.intercept('GET', '**/products').as('getProducts')
        cy.visit('/products')
        cy.wait('@getProducts').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })
    })
})