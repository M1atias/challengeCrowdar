import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";


Given("que estoy en la página de login de SauceDemo", () => {
  cy.visit('/');
  cy.get('[data-test="username"]').should('be.visible');
  cy.get('[data-test="password"]').should('be.visible');
});

Given("que estoy logueado como {string}", (usuario) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(usuario);
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/inventory.html');
});


When("ingreso el usuario {string} y contraseña {string}", (usuario, contraseña) => {
  cy.get('[data-test="username"]').clear().type(usuario);
  cy.get('[data-test="password"]').clear().type(contraseña);
});

When("hago click en el botón de login", () => {
  cy.get('[data-test="login-button"]').click();
});

When("agrego el producto {string} al carrito", (nombreProducto) => {
  cy.contains('.inventory_item', nombreProducto)
    .find('button')
    .contains('Add to cart')
    .click();
});

When("agrego los siguientes productos al carrito:", (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.contains('.inventory_item', row.producto)
      .find('button')
      .contains('Add to cart')
      .click();
  });
});

When("voy al carrito de compras", () => {
  cy.get('.shopping_cart_link').click();
});

When("procedo al checkout", () => {
  cy.get('[data-test="checkout"]').click();
});

When("completo la información de envío:", (dataTable) => {
  const info = dataTable.hashes()[0];
  cy.get('[data-test="firstName"]').type(info.firstName);
  cy.get('[data-test="lastName"]').type(info.lastName);
  cy.get('[data-test="postalCode"]').type(info.postalCode);
  cy.get('[data-test="continue"]').click();
});

When("finalizo la compra", () => {
  cy.get('[data-test="finish"]').click();
});


Then("debería estar en la página de productos", () => {
  cy.url().should('include', '/inventory.html');
});

Then("debería ver el título {string}", (titulo) => {
  cy.contains('.title', titulo).should('be.visible');
});

Then("debería ver un mensaje de error", () => {
  cy.get('[data-test="error"]').should('be.visible');
});

Then("debería permanecer en la página de login", () => {
  cy.url().should('not.include', '/inventory.html');
  cy.get('[data-test="username"]').should('be.visible');
});

Then("el contador del carrito debería mostrar {string}", (cantidad) => {
  cy.get('.shopping_cart_badge').should('contain.text', cantidad);
});

Then("el botón del producto debería cambiar a {string}", (textoBoton) => {
  cy.contains('button', textoBoton).should('be.visible');
});

Then("debería ver el mensaje de confirmación {string}", (mensaje) => {
  cy.contains('.complete-header', mensaje).should('be.visible');
});
