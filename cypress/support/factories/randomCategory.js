import { faker } from '@faker-js/faker'

export function createRandomCategory() {
    return {
        name: faker.commerce.department(),
        description: faker.commerce.productDescription()
    };
}