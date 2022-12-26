describe('Ecves register page', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.visit('http://localhost:3001/')

  })

  it('register page can be opened', function () {
    cy.contains('Get started').click()
    cy.contains('Register')
  })

  it('user can register with correct information', function() {
    cy.contains('Get started').click()
    cy.get('#firstName').type('testi')
    cy.get('#lastName').type('testi')
    cy.get('#email').type('testi@testi.fi')
    cy.get('#phoneNumber').type('1231231234')
    cy.get('#address').type('testistreet 20')
    cy.get('#password').type('salasana')

    cy.get('#register-button').click()

    cy.contains('Login')
  })

  it('user can not register with invalid information', function() {
    cy.contains('Get started').click()
    cy.get('#firstName').type('t')
    cy.get('#lastName').type('t')
    cy.get('#email').type('testi')
    cy.get('#password').type('s')

    cy.get('#register-button').click()

    cy.contains('First name must be 2 or more characters long')
    cy.contains('Last name must be 2 or more characters long')
    cy.contains('Invalid email')
    cy.contains('Password must be 8 or more characters long')
  })

  it('user can not register if email already exists', function () {
    cy.contains('Get started').click()
    cy.get('#firstName').type('testi')
    cy.get('#lastName').type('testi')
    cy.get('#email').type('testi@testi.fi')
    cy.get('#phoneNumber').type('1231231234')
    cy.get('#address').type('testistreet 20')
    cy.get('#password').type('salasana')

    cy.get('#register-button').click()
    
    cy.visit('http://localhost:3001/register')

    cy.get('#firstName').type('testi')
    cy.get('#lastName').type('testi')
    cy.get('#email').type('testi@testi.fi')
    cy.get('#password').type('salasana')

    cy.get('#register-button').click()

    cy.contains('Email already in use')
  })
})