Cypress.Commands.add('sendRequest', (type, endpoint, payload)=>{
    cy.request({
        method: type,
        url: endpoint,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'pk_296698589_LLL3L6732YNOSAX3ANMM89RNVYPHSRBC'
        },
        body: payload,
        failOnStatusCode: false
    });
})