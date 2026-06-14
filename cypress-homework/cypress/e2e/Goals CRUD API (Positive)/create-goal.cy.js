/// <reference types="cypress" />

const payloads = require('../../support/payloads');

describe('Create Goal ClickUP endpoint', () => {

    it('Create Goal (CRUD)', () => {

        let goalId;
        const payload = payloads.validGoalPayload();

        cy.env(['teamId']).then(({ teamId }) => {

            // CREATE
            cy.sendRequest('POST', `/team/${teamId}/goal`, payload)
                .then((response) => {

                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('goal');

                    goalId = response.body.goal.id;

                    expect(goalId).to.exist;
                    expect(response.body.goal.name).to.eq(payload.name);
                    expect(response.body.goal.description).to.eq(payload.description);
                    expect(response.body.goal.color).to.eq(payload.color);
                    expect(response.body.goal.due_date).to.eq(String(payload.due_date));

                    // DELETE
                    return cy.sendRequest('DELETE', `/goal/${goalId}`);
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                });

        });

    });

});