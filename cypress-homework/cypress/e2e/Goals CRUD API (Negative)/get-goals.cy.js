/// <reference types="cypress" />

const payloads = require('../../support/payloads');

describe('Get Goals ClickUP endpoint', () => {

    it('GET Goals with invalid teamId, returns 401', () => {

        const invalidTeamId = payloads.invalidTeamId();

        cy.env(['validToken']).then(({validToken}) => {

            cy.sendRequest('GET', `/team/${invalidTeamId}/goal`, null, validToken)
                .then((response) => {
                    expect(response.status).to.eq(401);

                    expect(response.body).to.have.property('err');
                    expect(response.body.err).to.eq('Workspace not authorized');

                    expect(response.body).to.have.property('ECODE');
                    expect(response.body.ECODE).to.eq('OAUTH_192');
                });
        });
    });
});