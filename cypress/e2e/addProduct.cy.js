import AddProductPage from '../page/addProductPage'
import LoginPage from '../page/LoginPage'
import { createRandomProduct } from '../support/factories/product'

describe('Adicionar produto', () => {

    const email = Cypress.env('USER_EMAIL')
    const password = Cypress.env('USER_PASSWORD')

    it('deve voltar para a página de produtos ao clicar no botão voltar', () => {
        LoginPage.paginaLogin()
        LoginPage.login(email, password)
        AddProductPage.clickAddProductButton()
        AddProductPage.clickBackButton()
        LoginPage.validatePageInitial()
    })

    context('Validando campos obrigatórios do formulário', () => {

        it('deve validar existência dos campos do formulário', () =>{
            LoginPage.paginaLogin()
            LoginPage.login(email, password)
            AddProductPage.clickAddProductButton()
            AddProductPage.validateFormFields()
            
        })

        it('deve recusar cadastro com campos de inputs obrigatórios vazios', () =>{
            LoginPage.paginaLogin()
            LoginPage.login(email, password)
            AddProductPage.clickAddProductButton()
            AddProductPage.clickAddButton()
            AddProductPage.validateRequiredErros()
        })

        it('deve recusar cadastro com campo fornecedor vazio', () =>{

            const product = createRandomProduct()

            LoginPage.paginaLogin()
            LoginPage.login(email, password)
            AddProductPage.clickAddProductButton()
            AddProductPage.fillProductForm(product)
            AddProductPage.selectRandomCategory()
            AddProductPage.clickAddButton()
            
        })

        it('deve recusar cadastro com campo categoria vazio', () =>{

            const product = createRandomProduct()

            LoginPage.paginaLogin()
            LoginPage.login(email, password)
            AddProductPage.clickAddProductButton()
            AddProductPage.fillProductForm(product)
            AddProductPage.selectRandomSupplier()
            AddProductPage.clickAddButton()
            
        })

        it('deve recusar cadastro com campos de lista obrigatórios vazios', () =>{

            const product = createRandomProduct()

            LoginPage.paginaLogin()
            LoginPage.login(email, password)
            AddProductPage.clickAddProductButton()
            AddProductPage.fillProductForm(product)
            AddProductPage.clickAddButton()
            AddProductPage.validateAlertErrorRequired()
        })
    })
})