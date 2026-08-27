import AddProductPage from '../page/AddProductPage'
import LoginPage from '../page/LoginPage'
import { createRandomProduct } from '../support/factories/product'

describe('Adicionar produto', () => {

    const email = Cypress.env('USER_EMAIL')
    const password = Cypress.env('USER_PASSWORD')

    beforeEach(() => {
        cy.login(email, password)
        cy.visit('/products')
    })

    context('Validar campos obrigatórios do formulário', () => {

        it('deve validar existência dos campos do formulário', () => {
            AddProductPage.clickAddProductButton()
            AddProductPage.validateFormFields()
            AddProductPage.getBtnAdd().should('be.visible')
            AddProductPage.getBtnCancel().should('be.visible')
        })

        it('deve recusar cadastro com campos de inputs obrigatórios vazios', () => {
            AddProductPage.clickAddProductButton()
            AddProductPage.clickAddButton()
            AddProductPage.getNameRequiredError()
                .should('be.visible').and('contain', 'Nome é obrigatório')
            AddProductPage.getPriceRequiredError()
                .should('be.visible').and('contain', 'Preço é obrigatório')
            AddProductPage.getStockRequiredError()
                .should('be.visible').and('contain', 'Estoque é obrigatório')
            AddProductPage.getSkuRequiredError()
                .should('be.visible').and('contain', 'SKU é obrigatório')
        })

        it('deve recusar cadastro com campo fornecedor vazio', () => {

            const product = createRandomProduct()

            AddProductPage.clickAddProductButton()
            AddProductPage.fillProductForm(product)
            AddProductPage.selectRandomCategory()
            AddProductPage.clickAddButton()
            AddProductPage.getToastAlert()
                .should('be.visible').and('contain', 'Erro ao adicionar');

        })

        it('deve recusar cadastro com campo categoria vazio', () => {

            const product = createRandomProduct()

            AddProductPage.clickAddProductButton()
            AddProductPage.fillProductForm(product)
            AddProductPage.selectRandomSupplier()
            AddProductPage.clickAddButton()
            AddProductPage.getToastAlert()
                .should('be.visible').and('contain', 'Erro ao adicionar');
        })

        it('deve recusar cadastro com campos de lista obrigatórios vazios', () => {

            const product = createRandomProduct()

            AddProductPage.clickAddProductButton()
            AddProductPage.fillProductForm(product)
            AddProductPage.clickAddButton()
            AddProductPage.getToastAlert()
                .should('be.visible').and('contain', 'Erro ao adicionar');
        })
    })

    it('deve voltar para a página de produtos ao clicar no botão voltar', () => {
        AddProductPage.clickAddProductButton()
        AddProductPage.clickBackButton()
        LoginPage.validatePageInitial()
    })

    it.only('deve adicionar um produto com sucesso', () => {

        const product = createRandomProduct()

        AddProductPage.clickAddProductButton()
        AddProductPage.fillProductForm(product)
        AddProductPage.selectRandomCategory()
        AddProductPage.selectRandomSupplier()
        AddProductPage.clickAddButton()
        AddProductPage.getToastAlert()
            .should('be.visible').and('contain', 'Produto adicionado com sucesso!')
        LoginPage.validatePageInitial()
            .should('be.visible').and('contain', 'Lista de Produtos (Admin View)')
    })
})