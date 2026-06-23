const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      baseUrl: 'https://api.clickup.com/api/v2',
      env: {
        validToken: 'pk_302572951_J1BQGT89EPXZE9UR13X0HATF7T5IETGH',
        invalidToken: 'pk_blablablaImInvalidSowhat',
        teamId: '90121849074'
      }
  },
});
