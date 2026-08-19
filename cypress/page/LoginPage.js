class LoginPage {
    // Seletores
    #elements = {
        emailInput: () => cy.get('[data-testid="email-input"]'),
        passwordInput: () => cy.get('[data-testid="password-input"]'),
        loginButton: () => cy.get('[data-testid="login-button"]'),
        errorMessageSenha: () => cy.get('[data-testid="password-error"]'),
        errorMessageEmail: () => cy.get('[data-testid="email-error"]'),
        logado: () => cy.get('[class="text-xl text-pink-100 mb-4"]').contains('Lista de Produtos (Admin View)')
    }

    preencherEmail(email){
        this.#elements.emailInput().clear().type(email)
    }

    preencherSenha(password){
        this.#elements.passwordInput().clear().type(password)
    }

    clickLoginButton(){
        this.#elements.loginButton().click()
    }

    messageErrorSenha(){
        return this.#elements.errorMessageSenha()
        .should('be.visible')
    }

    messageErrorEmail(){
        return this.#elements.errorMessageEmail()
        .should('be.visible')
    }

    paginaLogin(){
        cy.visit('/')
        this.#elements.emailInput().should('be.visible')
        this.#elements.passwordInput().should('be.visible')
        this.#elements.loginButton().should('be.visible')
    }


    login(email, password){
        this.#elements.emailInput().clear().type(email)
        this.#elements.passwordInput().clear().type(password)
        this.#elements.loginButton().click()
        this.#elements.logado().should('be.visible') 
    }
}

export default new LoginPage()