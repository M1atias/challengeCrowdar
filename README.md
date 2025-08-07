# Challenge Crowdar - Automation Framework

Framework de automatización de pruebas usando **Cypress** + **Cucumber** con soporte para testing de UI y API.

## 🚀 Características

- ✅ **Cypress 14.5.3** - Framework de testing moderno
- 🥒 **Cucumber/Gherkin** - BDD (Behavior Driven Development)
- 📊 **Reportes HTML** - Reportes detallados con screenshots
- 🖼️ **Screenshots automáticos** - Capturas en fallos
- 🌐 **Testing de API** - Integración con MercadoLibre API
- 🛒 **Testing de E-commerce** - Casos de SauceDemo

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Chrome o Edge (para ejecución de tests)

## 🔧 Instalación

```bash
git clone <repository-url>
cd challengeCrowdar
npm install
```

## 🎯 Casos de Prueba Disponibles

### 1. SauceDemo E-commerce Tests
- **Archivo**: `cypress/e2e/features/saucedemo-tests.feature`
- **Funcionalidades**: Login, carrito de compras, checkout completo

### 2. MercadoLibre API Tests  
- **Archivo**: `cypress/e2e/features/mercadolibre-api.feature`
- **Funcionalidades**: Testing de endpoints, validación de respuestas

### 3. Test de Fallo Intencional
- **Archivo**: `cypress/e2e/features/saucedemo-testFailure.feature`
- **Propósito**: Demostrar capturas automáticas en fallos

## 🚀 Ejecución de Tests

### Comandos Básicos
```bash
# Abrir Cypress en modo interactivo
npm run cypress:open

# Ejecutar todos los tests en modo headless
npm run test:all

# Ejecutar tests específicos
npm run test:saucedemo
npm run test:api
```

### Comandos con Reportes
```bash
# Ejecutar tests y generar reportes completos
npm run reports:full

# Ejecutar test de fallo con reportes
npm run test:failure-demo

# Solo generar reportes (de ejecuciones anteriores)
npm run generate:reports

# Abrir reportes existentes
npm run open:reports
```

## 📊 Reportes

### Tipos de Reportes Generados
1. **Reporte HTML Interactivo** - `cypress/reports/cucumber-html/index.html`
2. **Reporte Mochawesome** - `cypress/reports/reporte-ejecucion.html`
3. **Reporte JSON** - `cypress/reports/cucumber-json/`
4. **Reporte JUnit XML** - `cypress/reports/cucumber-junit.xml`

### Ver Reportes
Los reportes se abren automáticamente al usar `npm run reports:full`, o manualmente:
```bash
npm run open:reports
```

## 📁 Estructura del Proyecto

```
challengeCrowdar/
├── cypress/
│   ├── e2e/
│   │   ├── features/                 # Archivos .feature (Gherkin)
│   │   └── step_definitions/         # Implementación de steps
│   ├── fixtures/                     # Datos de prueba
│   ├── reports/                      # Reportes generados
│   ├── screenshots/                  # Capturas de fallos
│   └── support/                      # Comandos personalizados y hooks
├── cypress.config.js                 # Configuración principal
├── generate-cucumber-report.js       # Generador de reportes
└── package.json                      # Dependencias y scripts
```

## 🔧 Configuración

### Variables de Entorno
- **baseUrl**: `https://www.saucedemo.com/` (configurable en cypress.config.js)
- **Screenshots**: Habilitados solo en fallos
- **Videos**: Deshabilitados por defecto

### Configuración de Cucumber
Ver `.cypress-cucumber-preprocessorrc.json` para configuración de reportes y step definitions.

## 🧪 Casos de Uso

### 1. Testing de E-commerce (SauceDemo)
- Login con múltiples usuarios
- Agregar productos al carrito
- Proceso completo de checkout
- Validaciones de UI

### 2. Testing de API (MercadoLibre)
- Consulta de departamentos
- Validación de respuestas HTTP
- Verificación de estructura de datos

### 3. Manejo de Errores
- Capturas automáticas en fallos
- Logging detallado
- Reportes con evidencias

## 📖 Documentación Adicional

- [Cypress Documentation](https://docs.cypress.io/)
- [Cucumber Documentation](https://cucumber.io/docs/)

## 🏗️ Desarrollo

### Agregar Nuevos Tests
1. Crear archivo `.feature` en `cypress/e2e/features/`
2. Implementar step definitions en `cypress/e2e/step_definitions/`
3. Ejecutar con `npm run test:cucumber`

### Comandos Personalizados
Ver `cypress/support/commands.js` para comandos reutilizables como:
- `cy.loginSauceDemo()`
- `cy.apiGet()`
- `cy.addProductToCart()`

## 🐛 Troubleshooting

### Error en Screenshots
- Verificar que `screenshotOnRunFailure: true` en cypress.config.js
- Tests deben fallar para generar screenshots

### Reportes No Generados
- Ejecutar `npm run clean:reports` primero
- Verificar que existen archivos JSON en `cypress/reports/cucumber-json/`

### Error de Dependencias
```bash
npm install --save-dev @badeball/cypress-cucumber-preprocessor
npm install --save-dev multiple-cucumber-html-reporter
```