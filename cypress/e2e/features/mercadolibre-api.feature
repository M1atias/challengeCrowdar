Feature: Pruebas de API de MercadoLibre
  Como usuario del sistema
  Quiero verificar los servicios web de MercadoLibre
  Para asegurar que los departamentos estén disponibles

  Scenario: Verificar que el servicio de departamentos de MercadoLibre funciona
    When hago una petición GET a "https://www.mercadolibre.com.ar/menu/departments"
    Then la respuesta debería tener código de estado 200
    And la respuesta debería contener departamentos
    And debería contener al menos 5 departamentos

  Scenario: Verificar estructura de departamentos específicos
    When hago una petición GET a "https://www.mercadolibre.com.ar/menu/departments"
    Then la respuesta debería tener código de estado 200
    And la respuesta debería contener los siguientes departamentos:
      | departamento          |
      | Tecnología            |
      | Hogar y Muebles      |
      | Deportes y Fitness   |
      | Ropa y Accesorios    |

  Scenario: Verificar tiempo de respuesta del servicio
    When hago una petición GET a "https://www.mercadolibre.com.ar/menu/departments"
    Then la respuesta debería tener código de estado 200
    And la respuesta debería llegar en menos de 3000 milisegundos
    And la respuesta debería tener el header "content-type"
