/// <reference types="cypress" />

const payloads = require('../../support/payloads');

describe('Delete Goal ClickUP endpoint', () => {

    it('DELETE Goal (CRUD)', () => {

        let goalId;
        const payload = payloads.validGoalPayload();

        cy.env(['teamId', 'validToken']).then(({teamId, validToken}) => {

            // CREATE
            cy.sendRequest('POST', `/team/${teamId}/goal`, payload, validToken)
                .then((response) => {
                    expect(response.status).to.eq(200);

                    goalId = response.body.goal.id;
                    expect(goalId).to.exist;

                    // DELETE
                    return cy.sendRequest('DELETE', `/goal/${goalId}`, null, validToken);
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.deep.equal({});

                    return cy.sendRequest('GET', `/goal/${goalId}`, null, validToken);
                })
                .then((response) => {
                    expect(response.status).to.eq(404);

                    expect(response.body).to.have.property('err');
                    expect(response.body.err).to.eq('Goal Not Found');
                });
        });
    });
});