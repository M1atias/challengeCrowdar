const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

function generateCucumberReport() {
  const reportDir = 'cypress/reports';
  const cucumberJsonDir = 'cypress/reports/cucumber-json';
  
  if (!fs.existsSync(cucumberJsonDir)) {
    console.log('No se encontraron archivos JSON de Cucumber para generar el reporte.');
    return;
  }

  const jsonFiles = fs.readdirSync(cucumberJsonDir).filter(file => file.endsWith('.json'));
  
  if (jsonFiles.length === 0) {
    console.log('No se encontraron archivos JSON de Cucumber en:', cucumberJsonDir);
    return;
  }

  console.log(`Generando reporte de Cucumber con ${jsonFiles.length} archivo(s) JSON...`);

  report.generate({
    jsonDir: cucumberJsonDir,
    reportPath: `${reportDir}/cucumber-html`,
    metadata: {
      browser: {
        name: 'chrome',
        version: 'latest'
      },
      device: 'Local test machine',
      platform: {
        name: 'Windows',
        version: '10/11'
      }
    },
    customData: {
      title: 'Reporte de Ejecución - Challenge Crowdar',
      data: [
        { label: 'Proyecto', value: 'Automation Framework con Cypress + Cucumber' },
        { label: 'Release', value: '1.0.0' },
        { label: 'Cycle', value: 'Testing de Regresión' },
        { label: 'Execution Start Time', value: new Date().toLocaleString('es-ES') },
        { label: 'Environment', value: 'QA' }
      ]
    },
    pageTitle: 'Reporte de Testing - Challenge Crowdar',
    reportName: 'Reporte de Ejecución de Tests',
    pageFooter: '<div><p>Generado automáticamente por Cypress + Cucumber</p></div>',
    displayDuration: true,
    openReportInBrowser: true
  });

  console.log('Reporte de Cucumber generado exitosamente en:', `${reportDir}/cucumber-html`);
}

generateCucumberReport();
