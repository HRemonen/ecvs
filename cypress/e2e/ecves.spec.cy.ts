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
})