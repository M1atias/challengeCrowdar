const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    
    viewportWidth: 1280,
    viewportHeight: 720,
    
 
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    
    video: false,                    
    screenshotOnRunFailure: true,    
    
    // Configuración de carpetas
    screenshotsFolder: 'cypress/screenshots',
    
    stopOnFirstFailure: false,
    
    specPattern: 'cypress/e2e/**/*.{feature,cy.js,cy.jsx,cy.ts,cy.tsx}',
    
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);

      return config;
    },
  },
});
