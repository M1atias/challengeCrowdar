Feature: Pruebas en SauceDemo
  Como usuario de la tienda online SauceDemo
  Quiero poder realizar compras
  Para verificar que el sistema funciona correctamente

  Background:
    Given que estoy en la página de login de SauceDemo

  Scenario: Login exitoso con usuario válido
    When ingreso el usuario "standard_user" y contraseña "secret_sauce"
    And hago click en el botón de login
    Then debería estar en la página de productos
    And debería ver el título "Products"

  Scenario: Login fallido con credenciales incorrectas
    When ingreso el usuario "usuario_incorrecto" y contraseña "contraseña_incorrecta"
    And hago click en el botón de login
    Then debería ver un mensaje de error
    And debería permanecer en la página de login

  Scenario: Agregar producto al carrito
    Given que estoy logueado como "standard_user"
    When agrego el producto "Sauce Labs Backpack" al carrito
    Then el contador del carrito debería mostrar "1"
    And el botón del producto debería cambiar a "Remove"

  Scenario: Proceso completo de compra
    Given que estoy logueado como "standard_user"
    When agrego los siguientes productos al carrito:
      | producto                | 
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
    And voy al carrito de compras
    And procedo al checkout
    And completo la información de envío:
      | firstName | lastName | postalCode |
      | Juan      | Pérez    | 12345      |
    And finalizo la compra
    Then debería ver el mensaje de confirmación "Thank you for your order!"
