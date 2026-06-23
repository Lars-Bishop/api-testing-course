const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      baseUrl: 'https://api.clickup.com/api/v2',
      env: {
        validToken: 'pk_302572542_Y5JTCAMFUC6GRCO0LHGSGGJQWJGTN0UR',
        invalidToken: 'pk_blablablaImInvalidSowhat',
        teamId: '90121848771'
      }
  },
});
