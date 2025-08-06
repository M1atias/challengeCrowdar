describe('Mi primer test con Cypress', () => {
  it('Debería visitar una página web', () => {
    // Visitar una página web
    cy.visit('https://example.cypress.io')
    
    // Verificar que el título contenga cierto texto
    cy.contains('Kitchen Sink')
    
    // Hacer click en un enlace
    cy.contains('type').click()
    
    // Verificar que estamos en una nueva URL
    cy.url().should('include', '/commands/actions')
    
    // Escribir en un campo de texto
    cy.get('.action-email')
      .type('test@example.com')
      .should('have.value', 'test@example.com')
  })

  it('Debería hacer click en un botón', () => {
    cy.visit('https://example.cypress.io')
    
    cy.contains('Actions').click()
    cy.url().should('include', '/commands/actions')
    
    // Test de click en botón
    cy.get('.action-btn').click()
    
    // Verificar que aparezca un mensaje
    cy.get('#action-canvas').should('be.visible')
  })
})
