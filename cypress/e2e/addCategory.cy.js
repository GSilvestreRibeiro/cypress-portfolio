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
        AddCategoryPage.clickBtnAddCategory()
        cy.get('@windowOpen')
            .should('have.been.calledWith', '/categories', '_blank')
    })

    context('Adicionar categoria', () => {
        beforeEach(() => {
            cy.visit('/categories')
            AddCategoryPage.clickBtnNewCategory()
        })

        it('deve validar existencia dos campos', () => {
            //AddCategoryPage.getBtnNewCategory()
            AddCategoryPage.visibleFormsCategory()
            AddCategoryPage.clickBtnSaveCategory()
                .should('have.text', 'Salvar')
                .and('be.visible')
            AddCategoryPage.getBtnCancel()
                .should('have.text', 'Cancelar')
                .and('be.visible')

        })

        it('deve validar campos obrigatórios da categoria', () => {
            //AddCategoryPage.getBtnNewCategory()
            AddCategoryPage.clickBtnSaveCategory()
            AddCategoryPage.getLabelCategoryRequired()
                .should('be.visible').and('have.text', 'Nome da categoria é obrigatório')
            AddCategoryPage.getLabelDescriptionRequired()
                .should('be.visible').and('have.text', 'Descrição é obrigatória')
            AddCategoryPage.getToastAlert()
                .should('be.visible')
                .and('have.text', 'Corrija os erros antes de salvar')

        })

        it('deve cancelar a adição de uma categoria', () => {
            //AddCategoryPage.getBtnNewCategory()
            AddCategoryPage.clickBtnCancel()
            AddCategoryPage.getModalFormsCategory()
                .should('not.exist')
            AddCategoryPage.getLabelManagementCategory()
                .should('be.visible')
        })

        it.only('deve recusar cadastro de categoria com o campo nome da categoria vazio', () => {
            AddCategoryPage.fillDescriptionCategory(createRandomCategory())
            AddCategoryPage.clickBtnSaveCategory()
            AddCategoryPage.getLabelCategoryRequired()
                .should('be.visible').and('have.text', 'Nome da categoria é obrigatório')
            AddCategoryPage.getToastAlert()
                .should('be.visible')
                .and('have.text', 'Corrija os erros antes de salvar')
        })

        /*it('deve recusar cadastro de categoria com o campo de descrição vazio', () => {

        })

        it('deve adicionar uma categoria com sucesso', () => {

        })*/

    })
})