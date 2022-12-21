describe('When user has logged in', function () {
  before(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      firstName: "testi",
      lastName: "testi",
      email: "testi@testi.fi",
      password: "salasana"
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  beforeEach(function () {
    cy.login("testi@testi.fi", "salasana")
    cy.contains('Dashboard').click()
  })

  it('user can navigate to the dashboard', function () {
    cy.contains('Welcome back')
    cy.contains('testi testi')
    cy.contains('testi@testi.fi')
  })

  describe('inside ecv form window', function() {
    beforeEach(function() {
      cy.contains('Create new ecv').click()
    })

    it('user can open new ecv form', function () {  
      cy.contains('Experience')
      cy.contains('Education')
      cy.contains('Skills')
      cy.contains('Hobbies')
      cy.contains('Languages')
      cy.contains('Profile')
      cy.contains('Submit')
    })

    it('user can fill in the information and submit the form', function() {
      cy.get('#new-exp-button').click()
      cy.get('input[id=exp-company-0]').type('Testfactory')
      cy.get('input[id=exp-position-0]').type('Testmanager')
      cy.get('input[id=exp-position-0]').type('Testmanager')
      cy.get('input[id=exp-start-0]').type('2017-01-01')
      cy.get('input[id=exp-end-0]').type('2022-01-01')

      cy.get('#new-lang-button').click()
      cy.get('input[id=lang-0]').type('English')
      cy.get('#new-lang-button').click()
      cy.get('input[id=lang-1]').type('Testing')
      
      cy.get('input[id=profile]').type('I am a nice tester man, please hire!')
      cy.get('#submit-form-button').click()
    })
  })
})