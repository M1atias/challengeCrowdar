import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Pasos Given adicionales
Given("que estoy en la página principal de la aplicación", () => {
  cy.visit('/');
  cy.contains('Kitchen Sink').should('be.visible');
});

// Pasos When adicionales
When("navego a la sección {string}", (section) => {
  cy.contains(section).click();
});

When("escribo {string} en el campo de tipo {string}", (texto, tipo) => {
  cy.get(`input[type="${tipo}"]`).first().clear().type(texto);
});

// Pasos Then adicionales
Then("debería estar en la página {string}", (url) => {
  cy.url().should('include', url);
});

Then("debería ver el título {string}", (titulo) => {
  cy.contains('h1, h2, h3, h4, h5, h6', titulo).should('be.visible');
});

Then("el campo debería mostrar el valor {string}", (valor) => {
  cy.get('input').first().should('have.value', valor);
});

Then("debería ver los siguientes elementos:", (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.get(row.elemento).should('exist');
  });
});
