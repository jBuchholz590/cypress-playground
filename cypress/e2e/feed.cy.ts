describe('Feed', () => {
  beforeEach(() => {
    cy.loginByApi('testuser2@example.com', 'testuser2');
    cy.visit('/');
    cy.intercept('GET', 'http://vrt.struckmeier.name:3000/api/articles?*', (req) => {
      req.continue(res => {
        res.body.articles = res.body.articles.map(article => {
          if (article.author.username === 'Tobias') {
            article.favoritesCount = 99_999_999;
          }
          return article;
        });
      });
    }).as('globalArticles');
  });

  it('should do something?', () => {
    cy.get('[data-testid="global-feed"]').click();
    cy.wait('@globalArticles');
  });
});
