export const login = (username: string, password: string) => {
  cy.visit('/login');
  cy.url().should('equal', `${Cypress.config().baseUrl}/login`);

  cy.get('[data-testid="email"]').should('exist').type(username, { delay: 10 });
  cy.get('[data-testid="password"]').should('exist').type(`${password}{enter}`);
  cy.url().should('equalUrl', '/');
}
