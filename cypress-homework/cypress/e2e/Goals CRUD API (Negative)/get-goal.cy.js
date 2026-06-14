/// <reference types="cypress" />

const payloads = require('../../support/payloads');
const {faker} = require('@faker-js/faker');

describe('Get Goal ClickUP endpoint', () => {

    it('GET Goal with invalid goal_id, returns 404', () => {

        const invalidGoalId = faker.string.uuid();

        cy.env(['validToken']).then(({validToken}) => {

            cy.sendRequest('GET', `/goal/${invalidGoalId}`, null, validToken)

                .then((response) => {

                    expect(response.status).to.eq(404);

                    expect(response.body).to.have.property('err');
                    expect(response.body.err).to.eq('Goal Not Found');

                });
        });
    });

    it('GET Goal with invalid auth_api_key, returns 401', () => {

        let goalId;

        const payload = payloads.validGoalPayload();

        cy.env(['teamId', 'validToken', 'invalidToken']).then(({teamId, validToken, invalidToken}) => {

            //CREATE
            cy.sendRequest('POST', `/team/${teamId}/goal`, payload, validToken)

                .then((response) => {

                    expect(response.status).to.eq(200);

                    goalId = response.body.goal.id;
                    expect(goalId).to.exist;

                    //GET
                    return cy.sendRequest('GET', `/goal/${goalId}`, null, invalidToken);

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