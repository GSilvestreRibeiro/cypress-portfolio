import AddProductPage from '../page/addProductPage'
import LoginPage from '../page/LoginPage'

describe('Adicionar produto', () => {

    const email = Cypress.env('USER_EMAIL')
    const password = Cypress.env('USER_PASSWORD')

    context('Validando forms', () => {
        it('deve validar existência dos campos do formulário', () =>{
            LoginPage.paginaLogin()
            LoginPage.login(email, password)
            AddProductPage.clickAddProductButton()
            AddProductPage.validateFormFields()
            
        })
        it('deve recusar cadastro com campos obrigatórios vazios', () =>{
            LoginPage.paginaLogin()
            LoginPage.login(email, password)
            AddProductPage.clickAddProductButton()
            AddProductPage.validateFormFields()
            AddProductPage.clickAddButton()


        })
    })

})