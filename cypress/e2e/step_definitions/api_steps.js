import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse;
let requestStartTime;



When("hago una petición GET a {string}", (url) => {
  requestStartTime = Date.now();
  
  cy.request({
    method: 'GET',
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json, text/html, */*'
    },
    failOnStatusCode: false 
  }).then((response) => {
    apiResponse = response;
    cy.log(`Petición GET realizada a: ${url}`);
    cy.log(`Código de estado: ${response.status}`);
  });
});

When("hago una petición POST a {string} con el cuerpo:", (url, dataTable) => {
  const requestBody = {};
  dataTable.hashes().forEach((row) => {
    requestBody[row.campo] = row.valor;
  });
  
  requestStartTime = Date.now();
  
  cy.request({
    method: 'POST',
    url: url,
    body: requestBody,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    failOnStatusCode: false
  }).then((response) => {
    apiResponse = response;
    cy.log(`Petición POST realizada a: ${url}`);
    cy.log(`Código de estado: ${response.status}`);
  });
});



Then("la respuesta debería tener código de estado {int}", (expectedStatusCode) => {
  expect(apiResponse.status).to.equal(expectedStatusCode);
  cy.log(`Código de estado verificado: ${expectedStatusCode}`);
});

Then("la respuesta debería contener departamentos", () => {

  expect(apiResponse.body).to.not.be.empty;
  

  const responseText = JSON.stringify(apiResponse.body).toLowerCase();
  const departmentIndicators = [
    'departamento', 'categoria', 'section', 'menu', 'department'
  ];
  
  const hasDeparmentsData = departmentIndicators.some(indicator => 
    responseText.includes(indicator)
  );
  
  expect(hasDeparmentsData).to.be.true;
  cy.log('La respuesta contiene información de departamentos');
});

Then("debería contener al menos {int} departamentos", (minCount) => {

  let departmentCount = 0;
  
  if (Array.isArray(apiResponse.body)) {
    departmentCount = apiResponse.body.length;
  } else if (apiResponse.body && typeof apiResponse.body === 'object') {
    // Buscar arrays dentro del objeto que podrían contener departamentos
    const keys = Object.keys(apiResponse.body);
    for (const key of keys) {
      if (Array.isArray(apiResponse.body[key])) {
        departmentCount = Math.max(departmentCount, apiResponse.body[key].length);
      }
    }
  }
  
  expect(departmentCount).to.be.at.least(minCount);
  cy.log(`Se encontraron ${departmentCount} departamentos (mínimo requerido: ${minCount})`);
});

Then("la respuesta debería contener los siguientes departamentos:", (dataTable) => {
  const expectedDepartments = dataTable.hashes().map(row => row.departamento);
  const responseText = JSON.stringify(apiResponse.body).toLowerCase();
  
  expectedDepartments.forEach((department) => {
    const departmentLower = department.toLowerCase();
    const found = responseText.includes(departmentLower) || 
                  responseText.includes(departmentLower.replace(/\s+/g, '')) ||
                  responseText.includes(departmentLower.replace(/\s+/g, '-'));
    
    expect(found).to.be.true;
    cy.log(`Departamento encontrado: ${department}`);
  });
});

Then("la respuesta debería llegar en menos de {int} milisegundos", (maxTime) => {
  const responseTime = Date.now() - requestStartTime;
  expect(responseTime).to.be.lessThan(maxTime);
  cy.log(`Tiempo de respuesta: ${responseTime}ms (máximo permitido: ${maxTime}ms)`);
});

Then("la respuesta debería tener el header {string}", (headerName) => {
  expect(apiResponse.headers).to.have.property(headerName.toLowerCase());
  cy.log(`Header encontrado: ${headerName} = ${apiResponse.headers[headerName.toLowerCase()]}`);
});

Then("la respuesta debería ser un JSON válido", () => {
  expect(apiResponse.body).to.not.be.null;
  expect(typeof apiResponse.body).to.be.oneOf(['object', 'array']);
  cy.log('La respuesta es un JSON válido');
});

Then("debería poder extraer información de departamentos", () => {
  cy.then(() => {
    if (Array.isArray(apiResponse.body)) {
      cy.log(`Estructura de departamentos encontrada (${apiResponse.body.length} elementos)`);
      apiResponse.body.slice(0, 3).forEach((item, index) => {
        cy.log(`Departamento ${index + 1}: ${JSON.stringify(item).substring(0, 100)}...`);
      });
    } else if (apiResponse.body && typeof apiResponse.body === 'object') {
      const keys = Object.keys(apiResponse.body);
      cy.log(`Claves encontradas en la respuesta: ${keys.join(', ')}`);

      // Buscar claves que podrían contener departamentos
      const departmentKeys = keys.filter(key => 
        key.toLowerCase().includes('depart') || 
        key.toLowerCase().includes('categ') ||
        key.toLowerCase().includes('menu') ||
        key.toLowerCase().includes('section')
      );
      
      if (departmentKeys.length > 0) {
        cy.log(`Claves relacionadas con departamentos: ${departmentKeys.join(', ')}`);
      }
    }
  });
});
