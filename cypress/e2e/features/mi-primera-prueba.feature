Feature: Mi primera prueba con Cucumber
  Como usuario de la aplicación
  Quiero navegar por la página web
  Para verificar que funciona correctamente

  Scenario: Visitar la página principal
    Given que estoy en la página principal
    When hago click en el enlace "type"
    Then debería estar en la página de acciones
    And debería ver el campo de email

  Scenario: Escribir en un campo de texto
    Given que estoy en la página de acciones
    When escribo "test@example.com" en el campo email
    Then el campo debería contener "test@example.com"

  Scenario: Hacer click en un botón
    Given que estoy en la página de acciones
    When hago click en el botón de acción
    Then debería ver el canvas de acción
