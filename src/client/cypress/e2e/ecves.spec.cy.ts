describe('Ecves', () => {
  it('landing page can be opened', function () {
    cy.visit('http://localhost:5173/')
    cy.contains('Get started')
    cy.contains('Login')
    cy.contains('Your dream job is just a click away')
  })

  it('register form can be opened', function () {
    cy.visit('http://localhost:5173/')
    cy.contains('Get started').click()
    cy.contains('First name')
    cy.contains('Last name')
    cy.contains('Email')
    cy.contains('Phone number')
    cy.contains('Address')
    cy.contains('Password')
    cy.contains('Register')
  })

  it('login form can be opened', function () {
    cy.visit('http://localhost:5173/login')
    cy.contains('Email')
    cy.contains('Password')
    cy.contains('Login')
  })
})