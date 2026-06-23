const {faker} = require('@faker-js/faker');

function validGoalPayload() {
    return {
        multiple_owners: true,
        name: faker.company.catchPhrase(),
        due_date: Date.now() + 7 * 24 * 60 * 60 * 1000,
        description: faker.lorem.sentence(),
        color: faker.color.rgb({prefix: '#'})
    };
}

function invalidTeamId() {
    return Cypress._.random(
        100000000000000,
        999999999999999
    ).toString();
}

module.exports = {
    validGoalPayload,
    invalidTeamId
};