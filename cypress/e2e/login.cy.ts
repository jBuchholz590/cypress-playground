describe('Login', () => {

  beforeEach(() => {
    cy.visit('/login');
    cy.url().should('equal', `${Cypress.config().baseUrl}/login`);
  });

  it('should be able to login', () => {
    cy.contains('conduit');
    cy.get('[data-testid="email"]').should('exist').type('testuser2@example.com', { delay: 10 });
    cy.get('[data-testid="password"]').should('exist').type('testuser2{enter}');
    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
    cy.get('[data-testid="username"]').contains('testuser2');
    cy.url().should('equalUrl', '/');

    cy.get(('[data-testid="global-feed"]')).click();
    cy.log('asdf', Cypress.config());
    cy.contains('END-TO-END TESTING THE EASY WAY2');


    cy.get('.preview-link > .tag-list > li').as('tagList');
    ['e2e', 'ramona', 'tobias', 'ng-de', 'testing']
      .forEach(tag => cy.get('@tagList').should('contain', tag));
  });
});
