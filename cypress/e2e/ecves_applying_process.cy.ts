describe('Ecves postings', function () {
  it('anyone can visit and view postings page', function () {
    cy.visit('http://localhost:3001/')
    cy.contains('Postings').click()

    cy.get('#posting-list').children().should('not.have.length', 0)
    cy.get('ul#posting-list').children().should('contain', 'Login to apply')
  })

  it('anyone can filter postings', function () {
    cy.visit('http://localhost:3001/postings')
    cy.get('#search').type('Developer{enter}')

    cy.get('#posting-list').children().should('contain', 'Frontend developer')
    cy.get('ul#posting-list').children().should('contain', 'Login to apply')
  })
})

describe('Authenticated user application process', function () {
  before(function () {
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

})