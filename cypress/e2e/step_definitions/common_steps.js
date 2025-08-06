import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

// Pasos Given (Dados)
Given("que estoy en la página principal", () => {
  cy.visit('/');
  cy.contains('Kitchen Sink').should('be.visible');
});

Given("que estoy en la página de acciones", () => {
  cy.visit('/');
  cy.contains('Actions').click();
  cy.url().should('include', '/commands/actions');
});

// Pasos When (Cuando)
When("hago click en el enlace {string}", (linkText) => {
  cy.contains(linkText).click();
});

When("escribo {string} en el campo email", (email) => {
  cy.get('.action-email').clear().type(email);
});

When("hago click en el botón de acción", () => {
  cy.get('.action-btn').click();
});

// Pasos Then (Entonces)
Then("debería estar en la página de acciones", () => {
  cy.url().should('include', '/commands/actions');
});

Then("debería ver el campo de email", () => {
  cy.get('.action-email').should('be.visible');
});

Then("el campo debería contener {string}", (expectedValue) => {
  cy.get('.action-email').should('have.value', expectedValue);
});

Then("debería ver el canvas de acción", () => {
  cy.get('#action-canvas').should('be.visible');
});
