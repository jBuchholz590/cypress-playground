import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {

  it('should mount', () => {
    cy.mount(StepperComponent);
  });

  it('should default to 0', () => {
    cy.mount(StepperComponent);
    cy.get('[data-cy="counter"]').should('contain', 0);
  });

  it('should step up its game', () => {
    cy.mount(StepperComponent);
    cy.get('[aria-label="increment"]').click();
    cy.get('[data-cy="counter"]').should('contain', 1);
  });

  it('should step down its game', () => {
    cy.mount(StepperComponent);
    cy.get('[aria-label="decrement"]').click();
    cy.get('[data-cy="counter"]').should('contain', -1);
  });

});
