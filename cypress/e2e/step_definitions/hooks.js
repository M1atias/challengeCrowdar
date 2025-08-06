import { Before, After } from "@badeball/cypress-cucumber-preprocessor";

let currentScenarioFailed = false;
let currentScenarioName = '';

Before(function (scenario) {
  currentScenarioFailed = false;
  currentScenarioName = scenario.pickle?.name || 'Scenario desconocido';
  cy.log(`Iniciando scenario: "${currentScenarioName}"`);
});

After(function (scenario) {
  cy.then(() => {
    const state = Cypress.state();
    const hasFailedTest = currentScenarioFailed || 
                         (state && state.test && state.test.state === 'failed');
    
    if (hasFailedTest) {
      const scenarioName = currentScenarioName
        .replace(/[^a-zA-Z0-9\s]/g, '') 
        .replace(/\s+/g, '_')           
        .toLowerCase();
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const fileName = `SCENARIO_FAILED-${scenarioName}-${timestamp}`;
      
      cy.screenshot(fileName, {
        capture: 'viewport',
        overwrite: false
      });
      
      cy.log(`Scenario "${currentScenarioName}" falló - captura guardada como: ${fileName}`);
    } else {
      cy.log(`Scenario "${currentScenarioName}" completado exitosamente`);
    }
  });
});

if (typeof window !== 'undefined') {
  Cypress.on('fail', (err, runnable) => {
    currentScenarioFailed = true;
    throw err;
  });
}
