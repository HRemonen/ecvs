/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    email, password
  }).then(({ body }) => {
    console.log(body)
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3001')
  })
})

Cypress.Commands.add('createEcv', () => {
  const token = localStorage.getItem('loggedUser')
  const options = {
    method: 'POST',
    url: 'http://localhost:3001/api/ecvs',
    body: {
    experience: [{
      company: "Testingcompany",
      position: "tester man",
      startDate: new Date(2008, 1, 1)
    }],
    education: [{
      school: "MIT",
      startDate: new Date(2019, 8, 1)
    }],
    skills: ['Coding', 'Testing', 'E2e', 'QA'],
    hobbies: ['Rowing'],
    languages: ['Finnish'],
    Profile: "Testerman yuh"
  },
  headers: {
    'Authorization': `bearer ${JSON.parse(token).token}`
  }
}
cy.request(options)

})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>,
      createEcv(): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
     }
   }
}

export {}