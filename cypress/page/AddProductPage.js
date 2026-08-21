class AddProductPage {
    //Seletores
    #elements = {
        btnAddProduct: () => cy.get('[data-testid="add-product-button"]'),
        modalAddProduct: () => cy.get('[data-testid="add-product-modal"]')
            .find('.p-6.border-b.border-slate-700', '.text-2xl.font-bold.text-white.flex.items-center.gap-2')
            .contains('Adicionar Produto'),
        formContainer: () => cy.get('[data-testid="add-product-modal"]'),
        labelByName: (text) => cy.contains('label', text),
        fieldByTestId: (testId) => cy.get(`[data-testid="${testId}"]`),
        nameProductInput: () => cy.get('[data-testid="add-product-name"]'),
        priceProductInput: () => cy.get('[data-testid="add-product-price"]'),
        stockProductInput: () => cy.get('[data-testid="add-product-stock"]'),
        skuProductInput: () => cy.get('[data-testid="add-product-sku"]'),
        categoryProductInput: () => cy.get('[data-testid="add-product-category"]'),
        supplierProductInput: () => cy.get('[data-testid="add-product-supplier"]'),
        btnAdd: () => cy.get('[data-testid="add-product-submit"]'),
        btnCancel: () => cy.get('[data-testid="add-product-cancel"]'),
        textNameRequired: () => cy.get('[data-testid="error-add-product-name"]'),
        textPriceRequired: () => cy.get('[data-testid="error-add-product-price"]'),
        textStockRequired: () => cy.get('[data-testid="error-add-product-stock"]'),
        textSkuRequired: () => cy.get('[data-testid="error-add-product-sku"]')
    }

    fieldsData = [
        { label: 'Nome', testId: 'add-product-name', tag: 'INPUT' },
        { label: 'Preço (R$)', testId: 'add-product-price', tag: 'INPUT' },
        { label: 'Estoque', testId: 'add-product-stock', tag: 'INPUT' },
        { label: 'SKU', testId: 'add-product-sku', tag: 'INPUT' },
        { label: 'Categoria', testId: 'add-product-category', tag: 'BUTTON' },
        { label: 'Fornecedor', testId: 'add-product-supplier', tag: 'BUTTON' }
    ];

    clickAddProductButton(){
        this.#elements.btnAddProduct().click()
    }

    validateFormFields() {
        this.#elements.modalAddProduct().should('be.visible');
        this.#elements.formContainer().within(() => {
            this.fieldsData.forEach((field) => {
                // Imprime um log visual no painel do Cypress para indicar qual campo está sendo validado agora
                Cypress.log({
                    name: 'Validando Campo',
                    message: `-> ${field.label} (${field.testId})`
                });

                this.#elements.labelByName(field.label).should('be.visible');
                this.#elements.fieldByTestId(field.testId)
                    .should('be.visible')
                    .and('have.prop', 'tagName', field.tag);
            });
        });
        this.#elements.btnAdd().should('be.visible');
        this.#elements.btnCancel().should('be.visible');
    }

    clickAddButton(){
        this.#elements.btnAdd().click()
    }
    

}

export default new AddProductPage()