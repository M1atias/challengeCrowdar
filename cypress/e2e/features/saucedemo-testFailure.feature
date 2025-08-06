Feature: Pruebas en SauceDemo
  Como usuario de la tienda online SauceDemo
  Quiero poder realizar compras
  Para verificar que el sistema funciona correctamente

  Background:
    Given que estoy en la página de login de SauceDemo

  Scenario: Login exitoso con usuario válido
    When ingreso el usuario "a" y contraseña "a"
    And hago click en el botón de login
    Then debería estar en la página de productos
    And debería ver el título "Products"