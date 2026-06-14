Cypress.Commands.add('sendRequest', (type, endpoint, payload = null, token)=>{
    cy.request({
        method: type,
        url: endpoint,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: payload,
        failOnStatusCode: false
    });
})