class AddCategoryPage {

    #elements = {
        btnAddCategory: () => cy.get('[data-testid="new-category-button"]'),
        btnNewCategory: () => cy.contains('button', /^Nova Categoria$/),
        modalFormsCategory: () => cy.get('[class="w-full max-w-md bg-slate-800 rounded-xl border border-slate-700 shadow-2xl"]'),
        nameCategoryInput: () => cy.get('input[name="name"]'),
        descriptionCategoryInput: () => cy.get('textarea[name="description"]'),
        labelErrorRequired: () => cy.get('[class="text-red-400 text-xs mt-1"]'),
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

    getBtnAddCategory() {
        return this.#elements.btnAddCategory().click()
    }

    getBtnNewCategory() {
        this.#elements.btnNewCategory().click()
    }
    getNameCategoryInput() {
        return this.#elements.nameCategoryInput()
    }

    getDescriptionCategoryInput() {
        return this.#elements.descriptionCategoryInput()
    }

    getLabelErrorRequired() {
        return this.#elements.labelErrorRequired()
    }

    getBtnSaveCategory() {
        return this.#elements.btnSalveCategory()
    }

    getBtnCancel() {
        return this.#elements.btnCancel()
    }

    getToastAlert() {
        return this.#elements.toastAlert()
    }

    fillCategoryForm(name, description) {
        this.#elements.nameCategoryInput().clear().type(name)
        this.#elements.descriptionCategoryInput().clear().type(description)
    }

}

export default new AddCategoryPage()