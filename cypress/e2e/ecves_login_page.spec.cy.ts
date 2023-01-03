describe('Ecves login page', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      firstName: "testi",
      lastName: "testi",
      email: "testi@testi.fi",
      password: "salasana"
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3001/')
  })

  it('login page can be opened', function () {
    cy.contains('Login').click()
    cy.contains('Email')
    cy.contains('Password')
  })

  it('user can login with correct information', function() {
    cy.contains('Login').click()
    cy.get('#email').type('testi@testi.fi')
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()

    cy.contains('Dashboard')
    cy.contains('Logout')
  })

  it('user can not login with incorrect details', function () {
    cy.contains('Login').click()
    cy.get('#email').type('testi@testi.net')
    cy.get('#password').type('Salainensalasana')

    cy.get('#login-button').click()

    cy.contains("Invalid email or password")
  })
})