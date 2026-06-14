const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      baseUrl: 'https://api.clickup.com/api/v2',
      env: {
        token: 'pk_296698589_LLL3L6732YNOSAX3ANMM89RNVYPHSRBC',
        teamId: '90121739308'
      }
  },
});
