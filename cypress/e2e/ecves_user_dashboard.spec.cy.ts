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
    cy.url().should('include', '/dashboard')

    cy.contains('Welcome back')
    cy.contains('testi testi')
    cy.contains('testi@testi.fi')
  })

  it('user can logout from the site', function () {
    cy.contains('Logout').click()
  })

  describe('inside ecv form window', function() {
    beforeEach(function() {
      cy.contains('Create new ecv').click()
      cy.url().should('include', '/dashboard/ecvs/create')
    })

    it('user can open new ecv form', function () {  
      cy.contains('Experience')
      cy.contains('Education')
      cy.contains('skills')
      cy.contains('hobbies')
      cy.contains('languages')
      cy.contains('Profile')
      cy.contains('Submit')
    })

    it('user can fill in the information and submit the form', function() {
      cy.get('#new-exp-button').click()
      cy.get('input[id=exp-company-0]').type('Testfactory')
      cy.get('input[id=exp-position-0]').type('Testmanager')
      cy.get('input[id=exp-start-0]').type('2017-01-01')
      cy.get('input[id=exp-end-0]').type('2022-01-01')

      cy.get('#new-edu-button').click()
      cy.get('input[id=edu-school-0]').type('Testschool')
      cy.get('input[id=edu-start-0]').type('2017-01-01')
      cy.get('input[id=edu-end-0]').type('2022-01-01')
      cy.get('input[id=edu-info-0]').type('We learned to test here')

      cy.get('#new-skills-button').click()
      cy.get('input[id=skills-0]').type('Testing')

      cy.get('#new-hobbies-button').click()
      cy.get('input[id=hobbies-0]').type('Testing')

      cy.get('#new-languages-button').click()
      cy.get('input[id=languages-0]').type('English')

      cy.get('#new-languages-button').click()
      cy.get('input[id=languages-1]').type('Testing')
      
      cy.get('textarea[id=profile]').type('I am a nice tester man, please hire!')
      cy.get('#submit-form-button').click()
    })

    it('suer cannot create new ecv form with incorrect information', function () {
      cy.get('#new-exp-button').click()
      cy.get('#new-exp-button').click()
      cy.get('input[id=exp-company-0]').type('t')
      cy.get('input[id=exp-position-0]').type('t')
      cy.get('input[id=exp-start-0]').type('2200-01-01')
      cy.get('input[id=exp-end-0]').type('2022-01-01')
      cy.get('#submit-form-button').click()

      cy.contains('Company name must be atleast 3 characters long')
      cy.contains('Position must be atleast 3 characters long')
      cy.contains('Start date must be before today')
    })
  })

  describe('after creating ecv', function () {
    beforeEach(function() {
      cy.contains('Ecvs').click()
      cy.url().should('include', '/dashboard/ecvs')
    })

    it('user ecvs should appear in the ecvs tab', function () {
      cy.get('#skills-field').click()
      cy.get('#skills-field-content')
        .should('be.visible')
        .should('contain.text', 'Testing')

      cy.get('#experience-field').click()
      cy.get('#experience-field-content')
        .should('be.visible')
        .should('contain.text', 'Testfactory')
    })

    it('user can delete ecv of choise', function () {
      cy.get('#delete-button').click()

      cy.contains("You don‘t have any ecv‘s created.")
    })
  })
})