class LoginPage {
    // Seletores
    elements = {
        emailInput: () => cy.get('[data-testid="email-input"]'),
        passwordInput: () => cy.get('[data-testid="password-input"]'),
        loginButton: () => cy.get('[data-testid="login-button"]'),
        errorMessageSenha: () => cy.get('[data-testid="password-error"]'),
        errorMessageEmail: () => cy.get('[data-testid="email-error"]')
    }

    preencherEmail(email){
        this.elements.emailInput().clear().type(email)
    }

    preencherSenha(password){
        this.elements.passwordInput().clear().type(password)
    }

    clickLoginButton(){
        this.elements.loginButton().click()
    }

    messageErrorSenha(){
        return this.elements.errorMessageSenha()
        .should('be.visible')
    }

    messageErrorEmail(){
        return this.elements.errorMessageEmail()
        .should('be.visible')
    }


    login(email, senha){
        this.preencherEmail(email)
        this.preencherSenha(senha)
        this.clickLoginButton()
    }
}

export default new LoginPage()