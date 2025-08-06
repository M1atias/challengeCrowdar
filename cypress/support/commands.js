// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import 'cypress-mochawesome-reporter/register';

Cypress.Commands.add('loginSauceDemo', (username, password = 'secret_sauce') => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains('.inventory_item', productName)
    .find('button')
    .contains('Add to cart')
    .click();
});

Cypress.Commands.add('goToCartAndVerify', (expectedCount) => {
  cy.get('.shopping_cart_link').click();
  cy.get('.cart_item').should('have.length', expectedCount);
});

Cypress.Commands.add('completeCheckout', (firstName, lastName, postalCode) => {
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

Cypress.Commands.add('apiGet', (url, options = {}) => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json, text/html, */*'
    },
    failOnStatusCode: false,
    ...options
  };

  return cy.request(defaultOptions.method, url, defaultOptions)
    .then((response) => {
      cy.log(`📡 ${defaultOptions.method} ${url} → ${response.status}`);
      return response;
    });
});

Cypress.Commands.add('apiPost', (url, body, options = {}) => {
  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    failOnStatusCode: false,
    body: body,
    ...options
  };

  return cy.request(defaultOptions)
    .then((response) => {
      cy.log(`POST ${url} → ${response.status}`);
      return response;
    });
});

Cypress.Commands.add('validateApiResponse', (response, expectedStatus = 200) => {
  expect(response.status).to.equal(expectedStatus);
  expect(response.body).to.not.be.null;
  cy.log(`API Response válida: ${response.status}`);
});

Cypress.Commands.add('extractDepartments', (response) => {
  let departments = [];
  
  if (Array.isArray(response.body)) {
    departments = response.body;
  } else if (response.body && typeof response.body === 'object') {
    const keys = Object.keys(response.body);
    for (const key of keys) {
      if (Array.isArray(response.body[key]) && response.body[key].length > 0) {
        departments = response.body[key];
        break;
      }
    }
  }
  
  cy.log(`Departamentos extraídos: ${departments.length}`);
  return cy.wrap(departments);
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-cy="email"]').type(email);
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="submit"]').click();
});

Cypress.Commands.add('waitUntilVisible', (selector, options = {}) => {
  const timeout = options.timeout || 10000;
  cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector).scrollIntoView();
});

Cypress.Commands.add('addTestContext', (title, value) => {
  cy.addTestContext(`${title}: ${value}`);
});

Cypress.Commands.add('logTestStep', (step) => {
  cy.log(`${step}`);
  cy.addTestContext(`Paso ejecutado: ${step}`);
});