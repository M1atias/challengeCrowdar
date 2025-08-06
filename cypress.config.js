const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    // URL base para tus tests
    baseUrl: 'https://example.cypress.io',
    
    // Configuración de viewport
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    
    // Configuración de videos y screenshots
    video: true,
    screenshotOnRunFailure: true,
    
    // Patrones de archivos de test - ahora incluye features
    specPattern: 'cypress/e2e/**/*.{feature,cy.js,cy.jsx,cy.ts,cy.tsx}',
    
    setupNodeEvents(on, config) {
      // Configuración del preprocessor de Cucumber
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
