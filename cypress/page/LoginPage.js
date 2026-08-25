class LoginPage {
    // Seletores
    #elements = {
        emailInput: () => cy.get('[data-testid="email-input"]'),
        passwordInput: () => cy.get('[data-testid="password-input"]'),
        loginButton: () => cy.get('[data-testid="login-button"]'),
        errorMessageSenha: () => cy.get('[data-testid="password-error"]'),
        errorMessageEmail: () => cy.get('[data-testid="email-error"]'),
        logado: () => cy.contains('Lista de Produtos (Admin View)')
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
    }

    messageErrorEmail(){
        return this.#elements.errorMessageEmail()
        
    }

    paginaLogin(){
        cy.visit('/')
    }

    getEmailInput() {
        return this.#elements.emailInput()
    }

    getPasswordInput() {
        return this.#elements.passwordInput()
    }
    
    getLoginButton() {
        return this.#elements.loginButton()
    }

    login(email, password){
        this.#elements.emailInput().clear().type(email)
        this.#elements.passwordInput().clear().type(password)
        this.#elements.loginButton().click()
    }

    validatePageInitial() {
        return this.#elements.logado()
    }
}

export default new LoginPage()