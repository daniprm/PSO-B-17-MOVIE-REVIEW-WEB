describe('Fitur Pencarian', () => {
  beforeEach(() => {
    cy.session('session', () => {
      cy.login();
    });
    cy.visit('/');
  });

  it('seharusnya bisa mengetik, mencari, dan menampilkan hasil', () => {
    const searchKeyword = 'Inception';
    cy.get('[data-cy="search-input"]').type(`${searchKeyword}{enter}`);
    cy.url().should('include', `/search/${encodeURI(searchKeyword)}`);
    cy.get('[data-cy="search-results-header"]')
      .should('be.visible')
      .and('contain.text', `Hasil Pencarian Untuk ${searchKeyword}`);
  });
});