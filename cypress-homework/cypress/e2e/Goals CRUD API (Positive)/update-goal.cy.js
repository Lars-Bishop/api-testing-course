/// <reference types="cypress" />

const payloads = require('../../support/payloads');

describe('Update Goal ClickUP endpoint', () => {

    it('UPDATE Goal (CRUD)', () => {

        let goalId;

        const postPayload = payloads.validGoalPayload();
        const putPayload = payloads.validGoalPayload();

        cy.env(['teamId', 'validToken']).then(({teamId, validToken}) => {

            //CREATE
            cy.sendRequest('POST', `/team/${teamId}/goal`, postPayload, validToken)
                .then((response) => {

                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('goal');

                    goalId = response.body.goal.id;
                    expect(goalId).to.exist;

                    //UPDATE
                    return cy.sendRequest('PUT', `/goal/${goalId}`, putPayload, validToken);
                })

                .then((response) => {

                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('goal');
                    expect(response.body.goal.id).to.eq(goalId);

                    //GET
                    return cy.sendRequest('GET', `/team/${teamId}/goal`, null, validToken);
                })

                .then((response) => {

                    expect(response.status).to.eq(200);

                    const updatedGoal = response.body.goals.find(
                        goal => goal.id === goalId
                    );

                    expect(updatedGoal).to.exist;
                    expect(updatedGoal.name).to.eq(putPayload.name);
                    expect(updatedGoal.description).to.eq(putPayload.description);
                    expect(updatedGoal.color).to.eq(putPayload.color);
                    expect(updatedGoal.due_date).to.eq(String(putPayload.due_date));

                    //DELETE
                    return cy.sendRequest('DELETE', `/goal/${goalId}`, null, validToken);
                })

                .then((response) => {
                    expect(response.status).to.eq(200);
                });
        });
    });
});