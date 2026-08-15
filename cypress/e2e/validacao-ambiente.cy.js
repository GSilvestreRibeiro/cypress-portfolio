describe('Validação do Ambiente', () => {
    it('deve acessar o site e exibir a tela de login', () => {
        cy.paginaLogin()
    })

    it('deve autenticar com credenciais válidas', () => {
        cy.paginaLogin()
        cy.login()
    })

    it('deve exibir erro para credenciais inválidas', () => {
        cy.paginaLogin()
        cy.get('[data-testid="email-input"]').type(Cypress.env('USER_EMAIL'))
        cy.get('[data-testid="password-input"]').type('senhaerrada')
        cy.get('[data-testid="login-button"]').click()
        cy.get('[data-testid="password-error"]')
            .should('be.visible')
            .and('contain', 'Email ou senha inválidos')
    })

    it('cy.login() deve funcionar via cy.session()', () => {
        cy.paginaLogin()
        cy.login()
        cy.intercept('GET', '**/products').as('getProducts')
        cy.visit('/products')
        cy.wait('@getProducts').then((interception) => {
        expect(interception.response.statusCode).to.eq(200)
        })
    })
})