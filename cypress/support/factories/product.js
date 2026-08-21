import { faker } from '@faker-js/faker'

export function createRandomProduct() {

    const quantidade = faker.number.int({ min: 10, max: 17 });
    const numeros = faker.string.numeric(quantidade);

    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 1, max: 999999 }),
        stock: faker.number.int({ min: 1, max: 999 }),
        sku: `GR-${numeros}`
    };
}