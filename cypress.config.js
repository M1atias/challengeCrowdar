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
    
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    stopOnFirstFailure: false,
    
    specPattern: 'cypress/e2e/**/*.{feature,cy.js,cy.jsx,cy.ts,cy.tsx}',
    
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Reporte de Testing - Challenge Crowdar',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportDir: 'cypress/reports',
      reportFilename: 'reporte-ejecucion'
    },
    
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      require('cypress-mochawesome-reporter/plugin')(on);

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);

      return config;
    },
  },
});
