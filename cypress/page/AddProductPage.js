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
        listCategoryOptions: () => cy.get('[data-testid^="add-product-category-option-"]'),
        supplierProductInput: () => cy.get('[data-testid="add-product-supplier"]'),
        listSupplierOptions: () => cy.get('[data-testid^="add-product-supplier-option-"]'),
        btnAdd: () => cy.get('[data-testid="add-product-submit"]'),
        btnCancel: () => cy.get('[data-testid="add-product-cancel"]'),
        textNameRequired: () => cy.get('[data-testid="error-add-product-name"]'),
        textPriceRequired: () => cy.get('[data-testid="error-add-product-price"]'),
        textStockRequired: () => cy.get('[data-testid="error-add-product-stock"]'),
        textSkuRequired: () => cy.get('[data-testid="error-add-product-sku"]'),
        toastAlert: () => cy.get('[role="alert"]')
    }

    fieldsData = [
        { label: 'Nome', testId: 'add-product-name', tag: 'INPUT' },
        { label: 'Preço (R$)', testId: 'add-product-price', tag: 'INPUT' },
        { label: 'Estoque', testId: 'add-product-stock', tag: 'INPUT' },
        { label: 'SKU', testId: 'add-product-sku', tag: 'INPUT' },
        { label: 'Categoria', testId: 'add-product-category', tag: 'BUTTON' },
        { label: 'Fornecedor', testId: 'add-product-supplier', tag: 'BUTTON' }
    ];

    clickAddProductButton() {
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
            })
        })
    }

    getBtnAdd() {
        return this.#elements.btnAdd()
    }

    getBtnCancel() {
        return this.#elements.btnCancel()
    }

    clickAddButton() {
        this.#elements.btnAdd().click()
    }

    clickBackButton() {
        this.#elements.btnCancel().click()
    }

    getNameRequiredError() {
        return this.#elements.textNameRequired()
    }

    getPriceRequiredError() {
        return this.#elements.textPriceRequired()
    }

    getStockRequiredError() {
        return this.#elements.textStockRequired();
    }

    getSkuRequiredError() {
        return this.#elements.textSkuRequired();
    }

    fillProductForm(product) {
        this.#elements.nameProductInput().type(product.name);
        this.#elements.priceProductInput().type(product.price);
        this.#elements.stockProductInput().type(product.stock);
        this.#elements.skuProductInput().type(product.sku);
    }

    getToastAlert() {
        return this.#elements.toastAlert()
    }

    selectRandomCategory() {
        this.#elements.categoryProductInput().click()
        this.#elements.listCategoryOptions()
            .then(($options) => {
                const randomIndex = Cypress._.random($options.length - 1)

                cy.wrap($options).eq(randomIndex).click()
            })
    }

    selectRandomSupplier() {
        this.#elements.supplierProductInput().click()
        this.#elements.listSupplierOptions()
            .should('have.length.greaterThan', 0)
            .then(($options) => {
                const randomIndex = Cypress._.random(0, $options.length - 1)

                cy.wrap($options.eq(randomIndex))
                    .scrollIntoView()
                    .click()
            })
    }
}

export default new AddProductPage()