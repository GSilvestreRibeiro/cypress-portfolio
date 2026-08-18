describe('Realizar Login', () => {
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
        it('deve exibir erro para credenciais inválidas', () => {
            cy.paginaLogin()
            cy.get('[data-testid="email-input"]').type(Cypress.env('USER_EMAIL'))
            cy.get('[data-testid="password-input"]').type('senhaerrada')
            cy.get('[data-testid="login-button"]').click()
            cy.get('[data-testid="password-error"]')
                .should('be.visible')
                .and('contain', 'Email ou senha inválidos')
        })
        it('deve exibir erro para login apenas com email', () => {
            cy.paginaLogin()
            cy.get('[data-testid="email-input"]').type(Cypress.env('USER_EMAIL'))
            cy.get('[data-testid="login-button"]').click()
            cy.get('[data-testid="password-error"]')
                .should('be.visible')
                .and('contain', 'Email e senha são obrigatórios')
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