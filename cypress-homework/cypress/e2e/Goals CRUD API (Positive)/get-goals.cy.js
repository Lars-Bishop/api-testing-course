/// <reference types="cypress" />

describe('Get Goals ClickUP endpoint', () => {

    it('GET Goals, returns 200', () => {

        cy.env(['teamId', 'validToken']).then(({teamId, validToken}) => {

            cy.sendRequest('GET', `/team/${teamId}/goal`, null, validToken);
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('goals');
                expect(response.body.goals).to.be.an('array');
            });
    });
});