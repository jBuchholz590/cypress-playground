declare global {
  namespace Cypress {
    interface Chainer<Subject> {
      (chainer: 'equalUrl', url: string): Chainable<Subject>
    }
  }
}

export {}
