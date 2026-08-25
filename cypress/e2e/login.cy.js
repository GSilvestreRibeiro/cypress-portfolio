import LoginPage from '../page/LoginPage'

describe('Autenticação de usuário', () => {

    const email = Cypress.env('USER_EMAIL')
    const password = Cypress.env('USER_PASSWORD')
    


    context('Credenciais inválidas', () => {
            beforeEach(() => {
            LoginPage.paginaLogin()
    })
        it('deve acessar o site e exibir a tela de login', () => {
            LoginPage.getEmailInput().should('be.visible')
            LoginPage.getPasswordInput().should('be.visible')
            LoginPage.getLoginButton().should('be.visible')
        })
        it('deve exibir erro para email invalido', () => {
            LoginPage.preencherEmail('teste@teste.com')
            LoginPage.preencherSenha(password)
            LoginPage.clickLoginButton()
            LoginPage.messageErrorEmail()
                .should('have.text', 'Usuário não encontrado. Verifique o email ou cadastre-se.')
                .and('be.visible')
        })
        it('deve exibir erro para senha inválida', () => {
            LoginPage.preencherEmail(email)
            LoginPage.preencherSenha('senhaerrada')
            LoginPage.clickLoginButton()
            LoginPage.messageErrorSenha()
                .should('have.text', 'Email ou senha inválidos')
                .and('be.visible')
        })
        it('deve exibir erro para login apenas com senha', () => {
            LoginPage.preencherSenha(password)
            LoginPage.clickLoginButton()
            LoginPage.messageErrorSenha()
                .should('have.text', 'Email e senha são obrigatórios')
                .and('be.visible')
        })
    })

    context('Credenciais válidas', () => {
        beforeEach(() => {
            cy.login(email, password)
        })
        it('deve autenticar com credenciais válidas', () => {
            //cy.login(email, password)
            cy.visit('/products')
            LoginPage.validatePageInitial()
                .should('be.visible').and('contain', 'Lista de Produtos (Admin View)')
        })
    })

    it('cy.login() deve funcionar via cy.session()', () => {
        cy.login(email, password)
        cy.intercept('GET', '**api/v1/products*').as('getProducts')
        cy.visit('/products')
        cy.wait('@getProducts').then((interception) => {
            expect(interception.response.statusCode).to.eq(200)
        })
    })
})