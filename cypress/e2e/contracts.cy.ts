describe('Contract Management', () => {
  beforeEach(() => {
    cy.login('demo@ethereus.com', 'demo123');
    cy.visit('/contracts');
  });

  it('should create new contract', () => {
    cy.get('[data-cy=new-contract]').click();
    cy.get('[data-cy=contract-name]').type('Test Contract');
    cy.get('[data-cy=contract-type]').select('real-estate');
    cy.get('[data-cy=contract-jurisdiction]').select('USA');
    cy.get('[data-cy=add-party]').click();
    cy.get('[data-cy=party-name-0]').type('Party 1');
    cy.get('[data-cy=party-role-0]').type('Seller');
    cy.get('[data-cy=create-contract]').click();
    cy.get('[data-cy=success-message]').should('be.visible');
  });

  it('should preview contract', () => {
    cy.get('[data-cy=contract-list]').first().click();
    cy.get('[data-cy=preview-contract]').click();
    cy.get('[data-cy=contract-preview]').should('be.visible');
  });

  it('should sign contract', () => {
    cy.get('[data-cy=contract-list]').first().click();
    cy.get('[data-cy=sign-contract]').click();
    cy.get('[data-cy=success-message]').should('contain', 'Contract signed');
  });
});