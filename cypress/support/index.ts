chai.use((_chai) => {
  function equalUrl(url: string) {
    this.assert(this._obj === `${Cypress.config().baseUrl}${url}`, `expected url to match ${Cypress.config().baseUrl}${url}, but got ${this._obj}`);
  }

  _chai.Assertion.addMethod('equalUrl', equalUrl);
});
