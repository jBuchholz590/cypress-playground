import { suppressGdpr } from '../helpers/supressgdpr';

describe('Multi domain behavior', () => {
  it('should login', () => {
    suppressGdpr();

    cy.visit('https://openidconnect.net');
    cy.contains('Start').click();
    cy.origin('https://samples.auth0.com/', () => {
      // scope of second domain
      cy.get('#username').type('hans@example.com');
      cy.get('#password').type('secret{enter}');
    });
    cy.get('.code-snippet').should('exist');
  });
});
