Feature: Navegación avanzada en la aplicación
  Como usuario de la aplicación web
  Quiero poder navegar entre diferentes secciones
  Para realizar diferentes acciones

  Background:
    Given que estoy en la página principal de la aplicación

  Scenario: Navegar a la sección de Querying
    When hago click en el enlace "Querying"
    Then debería estar en la página "/commands/querying"
    And debería ver el título "Querying"

  Scenario Outline: Probar diferentes tipos de input
    When navego a la sección "Actions"
    And escribo "<texto>" en el campo de tipo "<tipo>"
    Then el campo debería mostrar el valor "<resultado>"

    Examples:
      | texto           | tipo    | resultado       |
      | test@email.com  | email   | test@email.com  |
      | mi descripción  | text    | mi descripción  |
      | 12345          | number  | 12345           |

  Scenario: Verificar múltiples elementos
    When navego a la sección "Traversal"
    Then debería ver los siguientes elementos:
      | elemento                |
      | .traversal-breadcrumb   |
      | .traversal-pagination   |
      | .traversal-table        |
