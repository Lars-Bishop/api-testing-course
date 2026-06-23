/// <reference types="cypress" />

const payloads = require('../../support/payloads');

describe('Create Goal ClickUP endpoint', () => {

    it('Create Goal with req field missing, returns 500', () => {

        const invalidPayload = payloads.validGoalPayload();

        delete invalidPayload.name;

        cy.env(['teamId', 'validToken']).then(({ teamId, validToken }) => {

            cy.sendRequest('POST', `/team/${teamId}/goal`, invalidPayload, validToken)
                .then((response) => {
                    expect(response.status).to.eq(500);

                    expect(response.body).to.have.property('err');
                    expect(response.body.err).to.eq('Internal Server Error');

                    expect(response.body).to.have.property('ECODE');
                    expect(response.body.ECODE).to.eq('GOAL_005');
                });
        });
    });

    it('POST Create Goal with invalid auth_api_key, returns 401', () => {

        const payload = payloads.validGoalPayload();

        cy.env(['teamId', 'invalidToken']).then(({ teamId, invalidToken }) => {

            cy.sendRequest('POST', `/team/${teamId}/goal`, payload, invalidToken)
                .then((response) => {
                    expect(response.status).to.eq(401);

                    expect(response.body).to.have.property('err');
                    expect(response.body.err).to.eq('Token invalid');

                    expect(response.body).to.have.property('ECODE');
                    expect(response.body.ECODE).to.eq('OAUTH_025');
                });
        });
    });
});