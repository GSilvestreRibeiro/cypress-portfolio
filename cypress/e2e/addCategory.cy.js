import LoginPage from '../page/LoginPage'
import AddCategoryPage from '../page/AddCategoryPage'
import { createRandomCategory } from '../support/factories/randomCategory'


describe('Adicionar categoria', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/products')
        LoginPage.validatePageInitial()
            .should('be.visible').and('contain', 'Lista de Produtos (Admin View)')
    })

    it('deve abrir tela de adicionar categoria', () => {
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen')
        })
        AddCategoryPage.getBtnAddCategory()
        cy.get('@windowOpen')
            .should('have.been.calledWith', '/categories', '_blank')
    })

    context('Adicionar categoria', () => {
        beforeEach(() => {
            cy.visit('/categories')
        })

        it('deve validar existencia dos campos', () => {
            AddCategoryPage.getBtnNewCategory()
            AddCategoryPage.visibleFormsCategory()
            AddCategoryPage.getBtnSaveCategory()
                .should('text', 'Salvar')
                .and('be.visible')
            AddCategoryPage.getBtnCancel()
                .should('text', 'Cancelar')
                .and('be.visible')

        })

        /*it('deve validar campos obrigatórios da categoria', () => {

        })

        it('deve cancelar a adição de uma categoria', () => {

        })

        it('deve recusar cadastro de categoria com o campo nome da categoria vazio', () => {

        })

        it('deve recusar cadastro de categoria com o campo de descrição vazio', () => {

        })

        it('deve adicionar uma categoria com sucesso', () => {

        })*/

    })
})