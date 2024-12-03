describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('[data-cy=login-email]').type('demo@ethereus.com');
    cy.get('[data-cy=login-password]').type('demo123');
    cy.get('[data-cy=login-submit]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should show error with invalid credentials', () => {
    cy.get('[data-cy=login-email]').type('wrong@email.com');
    cy.get('[data-cy=login-password]').type('wrongpass');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy=error-message]').should('be.visible');
  });

  it('should register new user successfully', () => {
    cy.get('[data-cy=register-link]').click();
    cy.get('[data-cy=register-name]').type('Test User');
    cy.get('[data-cy=register-email]').type('test@example.com');
    cy.get('[data-cy=register-password]').type('password123');
    cy.get('[data-cy=register-submit]').click();
    cy.url().should('include', '/dashboard');
  });
});