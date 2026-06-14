/// <reference types="cypress" />

const payloads = require('../../support/payloads');
const {faker} = require('@faker-js/faker');

describe('Update Goal ClickUP endpoint', () => {

    it('PUT Update Goal with empty body', () => {

        let goalId;

        const postPayload = payloads.validGoalPayload();
        const invalidPayload = {};

        cy.env(['teamId', 'validToken']).then(({teamId, validToken}) => {

            //CREATE
            cy.sendRequest('POST', `/team/${teamId}/goal`, postPayload, validToken)

                .then((response) => {
                    expect(response.status).to.eq(200);

                    goalId = response.body.goal.id;
                    expect(goalId).to.exist;

                    //UPDATE
                    return cy.sendRequest('PUT', `/goal/${goalId}`, invalidPayload, validToken);
                })

                .then((response) => {
                    expect(response.status).to.eq(400);

                    //DELETE
                    return cy.sendRequest('DELETE', `/goal/${goalId}`, null, validToken);
                })

                .then((response) => {
                    expect(response.status).to.eq(200);
                });
        });
    });

    it('PUT Update Goal with invalid goal_id, returns 404', () => {

        const payload = payloads.validGoalPayload();
        const invalidGoalId = faker.string.uuid();

        cy.env(['validToken']).then(({validToken}) => {

            cy.sendRequest('PUT', `/goal/${invalidGoalId}`, payload, validToken)

                .then((response) => {

                    expect(response.status).to.eq(404);

                    expect(response.body).to.have.property('err');
                    expect(response.body.err).to.eq('Goal Not Found');
                });
        });
    });

    it('PUT Update Goal with invalid auth_api_key, returns 401', () => {

        let goalId;

        const postPayload = payloads.validGoalPayload();
        const putPayload = payloads.validGoalPayload();

        cy.env(['teamId', 'validToken', 'invalidToken']).then(({teamId, validToken, invalidToken}) => {

            //CREATE
            cy.sendRequest('POST', `/team/${teamId}/goal`, postPayload, validToken)

                .then((response) => {

                    expect(response.status).to.eq(200);

                    goalId = response.body.goal.id;
                    expect(goalId).to.exist;

                    //UPDATE
                    return cy.sendRequest('PUT', `/goal/${goalId}`, putPayload, invalidToken);
                })

                .then((response) => {

                    expect(response.status).to.eq(401);

                    expect(response.body).to.have.property('err');
                    expect(response.body.err).to.eq('Token invalid');

                    expect(response.body).to.have.property('ECODE');
                    expect(response.body.ECODE).to.eq('OAUTH_025');

                    //DELETE
                    return cy.sendRequest('DELETE', `/goal/${goalId}`, null, validToken);
                })

                .then((response) => {
                    expect(response.status).to.eq(200);
                });
        });
    });
});