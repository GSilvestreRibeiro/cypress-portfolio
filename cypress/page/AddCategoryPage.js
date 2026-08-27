class AddCategoryPage {

    #elements = {
        btnAddCategory: () => cy.get('[data-testid="new-category-button"]'),
        btnNewCategory: () => cy.contains('button', /^Nova Categoria$/),
        labelManagementCategory: () => cy.contains('h1', 'Gestão de Categorias'),
        modalFormsCategory: () => cy.get('[class="w-full max-w-md bg-slate-800 rounded-xl border border-slate-700 shadow-2xl"]'),
        nameCategoryInput: () => cy.get('input[name="name"]'),
        descriptionCategoryInput: () => cy.get('textarea[name="description"]'),
        labelCategoryRequired: () => cy.contains('p', 'Nome da categoria é obrigatório'),
        labelDescriptionRequired: () => cy.get('textarea[name="description"] + p'),
        btnCancel: () => cy.get('button[type="button"]'),
        toastAlert: () => cy.get('[role="alert"]'),
        labelByName: (text) => cy.contains('label', text),
        fieldByTestId: (selector) => cy.get(`${selector}`),
        btnSalveCategory: () => cy.get('button[type="submit"]'),
    }

    fieldsCategory = [
        { label: 'Nome da Categoria', selector: '[name="name"]', tag: 'INPUT' },
        { label: 'Descrição', selector: 'textarea[name="description"]', tag: 'TEXTAREA' }
    ];


    visibleFormsCategory() {
        this.#elements.modalFormsCategory().within(() => {
            this.fieldsCategory.forEach((field) => {
                // Imprime um log visual no painel do Cypress para indicar qual campo está sendo validado agora
                Cypress.log({
                    name: 'Validando Campo',
                    message: `-> ${field.label} (${field.selector})`
                });
                this.#elements.labelByName(field.label).should('be.visible');
                this.#elements.fieldByTestId(field.selector)
                    .should('be.visible')
                    .and('have.prop', 'tagName', field.tag);
            });
        });
    }

    getLabelManagementCategory() {
        return this.#elements.labelManagementCategory()
    }

    getModalFormsCategory() {
        return this.#elements.modalFormsCategory()
    }

    clickBtnAddCategory() {
        return this.#elements.btnAddCategory().click()
    }

    clickBtnNewCategory() {
        return this.#elements.btnNewCategory().click()
    }
    getNameCategoryInput() {
        return this.#elements.nameCategoryInput()
    }

    getDescriptionCategoryInput() {
        return this.#elements.descriptionCategoryInput()
    }

    getLabelCategoryRequired() {
        return this.#elements.labelCategoryRequired()
    }

    getLabelDescriptionRequired() {
        return this.#elements.labelDescriptionRequired()
    }

    clickBtnSaveCategory() {
        return this.#elements.btnSalveCategory().click()
    }

    getBtnCancel() {
        return this.#elements.btnCancel()
    }

    clickBtnCancel() { 
        return this.#elements.btnCancel().click()
    }

    getToastAlert() {
        return this.#elements.toastAlert()
    }

    fillCategoryForm(name, description) {
        this.#elements.nameCategoryInput().clear().type(name)
        this.#elements.descriptionCategoryInput().clear().type(description)
    }

    fillNameCategory(randomCategory) {
        this.#elements.nameCategoryInput().clear().type(randomCategory.name)
    }

    fillDescriptionCategory(randomCategory) {
        this.#elements.descriptionCategoryInput().clear().type(randomCategory.description)
    }

}

export default new AddCategoryPage()