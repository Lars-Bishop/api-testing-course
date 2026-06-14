/// <reference types="cypress" />

const payloads = require('../../support/payloads');

describe('Get Goal ClickUP endpoint', () => {

    it('GET Goal (CRUD)', () => {

        let goalId;
        const payload = payloads.validGoalPayload();

        cy.env(['teamId', 'validToken']).then(({teamId, validToken}) => {

            //CREATE
            cy.sendRequest('POST', `/team/${teamId}/goal`, payload, validToken)
                .then((response) => {

                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('goal');

                    goalId = response.body.goal.id;
                    expect(goalId).to.exist;

                    //GET
                    return cy.sendRequest('GET', `/goal/${goalId}`, null, validToken);
                })

                .then((response) => {

                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('goal');

                    const goal = response.body.goal;

                    expect(goal.id).to.eq(goalId);
                    expect(goal.name).to.eq(payload.name);
                    expect(goal.description).to.eq(payload.description);
                    expect(goal.color).to.eq(payload.color);
                    expect(goal.due_date).to.eq(String(payload.due_date));

                    return cy.sendRequest('DELETE', `/goal/${goalId}`, null, validToken);
                })

                .then((response) => {
                    expect(response.status).to.eq(200);
                });
        });
    });
});