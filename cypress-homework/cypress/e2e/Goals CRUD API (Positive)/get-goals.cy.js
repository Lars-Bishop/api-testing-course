/// <reference types="cypress" />

const payloads = require('../../support/payloads');

describe('Get Goals ClickUP endpoint', () => {

    it('Create, Get and Delete Goal', () => {

        // CREATE
        let goalId;
        const payload = payloads.validGoalPayload();

        cy.sendRequest('POST', '/team/90121739308/goal', payload)
            .then((response) => {
                expect(response.status).to.eq(200);
                goalId = response.body.goal.id;
                expect(goalId).to.exist;

                // GET
                return cy.sendRequest('GET', '/team/90121739308/goal');
            })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('goals');
                expect(response.body.goals).to.be.an('array');

                const createdGoal = response.body.goals.find(
                    goal => goal.id === goalId
                );
                expect(createdGoal).to.exist;
                expect(createdGoal.name).to.eq(payload.name);
                expect(createdGoal.description).to.eq(payload.description);
                expect(createdGoal.color).to.eq(payload.color);
                expect(createdGoal.due_date).to.eq(String(payload.due_date));

                // DELETE
                return cy.sendRequest('DELETE', `/goal/${goalId}`);
            })
            .then((response) => {
                expect(response.status).to.eq(200);
            });

    });

});


//team_id - 90121739308
//auth_key - pk_296698589_LLL3L6732YNOSAX3ANMM89RNVYPHSRBC