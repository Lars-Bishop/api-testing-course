/// <reference types="cypress" />


describe('Get Goals ClickUP endpoint', () => {

    it('Send get request to Goals, returns 200', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.clickup.com/api/v2/team/90121739308/goal',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'pk_296698589_LLL3L6732YNOSAX3ANMM89RNVYPHSRBC'
            }
        })
    })
})

//team_id - 90121739308
//auth_key - pk_296698589_LLL3L6732YNOSAX3ANMM89RNVYPHSRBC