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
  })
})