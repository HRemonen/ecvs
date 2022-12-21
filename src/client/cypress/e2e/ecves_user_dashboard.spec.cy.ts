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
  })

  it('user can navigate to the dashboard', function () {
    cy.contains('Dashboard').click()
    cy.contains('welcome')
  })
})