/// <reference types="cypress" />

const payloads = require('../../support/payloads');

describe('Get Goals ClickUP endpoint', () => {

    it('GET Goals, returns 200', () => {


        cy.env(['teamId']).then(({teamId}) => {

            cy.sendRequest('GET', `/team/${teamId}/goal`);
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('goals');
                expect(response.body.goals).to.be.an('array');
            })
    });
});