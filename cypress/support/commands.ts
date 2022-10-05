/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginByUI(email: string, password: string): Chainable<void>;

      loginByApi(email: string, password: string): Chainable<Response<any>>;
    }
  }
}


Cypress.Commands.add('loginByUI', (email = 'testuser2@example.com', password = 'testuser2') => {
  cy.visit('/login');
  cy.url().should('equal', `${Cypress.config().baseUrl}/login`);

  cy.get('[data-testid="email"]').should('exist').type(email, { delay: 10 });
  cy.get('[data-testid="password"]').should('exist').type(`${password}{enter}`);
  cy.url().should('equalUrl', '/');
});

Cypress.Commands.add('loginByApi', (email = 'testuser2@example.com', password = 'testuser2') => {
  return cy.request({
    method: 'POST',
    url: 'http://vrt.struckmeier.name:3000/api/users/login',
    body: { user: { email, password } },
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.user).to.have.property('token');
    localStorage.setItem('jwtToken', response.body.user.token);
  });
});

export {};
