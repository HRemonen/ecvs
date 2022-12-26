describe('Ecves', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3001/')
  })
  it('landing page can be opened', function () {
    cy.contains('Get started')
    cy.contains('Login')
    cy.contains('Your dream job is just a click away')
  })

  it('register form can be opened', function () {
    cy.contains('Get started').click()
    cy.contains('First name')
    cy.contains('Last name')
    cy.contains('Email')
    cy.contains('Phone number')
    cy.contains('Address')
    cy.contains('Password')
    cy.contains('Register')
  })

  it('bad url should show 404 not found page', function () {
    cy.visit('http://localhost:3001/thisurldoesnotexist')
    cy.contains('Looks like you‘ve found the doorway to the great nothing')
    cy.contains('Take me there!').click()
    cy.contains('Your dream job is just a click away')
  })
})