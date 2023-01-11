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

describe('Authenticated user posting page', function () {
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
    cy.visit('http://localhost:3001/postings')
  })

  it('user can view postings', function () {
    cy.visit('http://localhost:3001/')
    cy.contains('Postings').click()

    cy.get('#posting-list').children().should('not.have.length', 0)
    cy.get('ul#posting-list').children().should('contain', 'More info')
  })

  it('user can filter postings', function () {
    cy.visit('http://localhost:3001/postings')
    cy.get('#search').type('Developer{enter}')

    cy.get('#posting-list').children().should('contain', 'Frontend developer')
    cy.get('ul#posting-list').children().should('contain', 'More info')
  })

  it('user can visit single posting page', function () {
    cy.contains('More info').click()
    cy.contains('Ends on')
    cy.contains('Back to postings')
    cy.contains('More info')
    cy.contains('You dont have any Ecvs to apply with.')
  })
})

describe('Authenticated user applying process', function () {
  before(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
  
    const user = {
      firstName: "testi",
      lastName: "testi",
      email: "testi@testi.fi",
      password: "salasana"
    }
  
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.login("testi@testi.fi", "salasana")
    cy.createEcv()
  })
  beforeEach(function () {
    cy.login("testi@testi.fi", "salasana")
    cy.visit('http://localhost:3001/postings')
  })

  it('user can not apply to a posting without selecting an Ecv', function () {
    cy.contains('More info').click()
    cy.contains('Apply now')
    cy.contains('Choose an Ecv to apply with')
    cy.get('#apply-button').should('be.disabled')
  })

  it('user can apply to a posting after selecting an Ecv', function () {
    cy.contains('More info').click()
    cy.get('select').select(1)
    cy.get('#apply-button').should('not.be.disabled').click()
    cy.contains('Application received succesfully')
  })

  it('After applying application should appear in the dashboad tab', function () {
    cy.contains('Dashboard').click()
    cy.contains('Applications').click()
    cy.contains('More info').click()
    cy.contains('Application received succesfully')
  })

  it('After applying user can not delete Ecv used to apply', function () {
    cy.contains('Dashboard').click()
    cy.contains('Ecvs').click()

    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('#delete-button').click()

    cy.then(() => expect(stub.getCall(0)).to.be.calledWith(
      'Cannot delete this Ecv because it has open applications'))
  })
})