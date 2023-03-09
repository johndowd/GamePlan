/// <reference types="Cypress" />
import testData from "../fixtures/testData.json"
import CypressSeeder from "../support/CypressSeeder"
import userSignIn from "../support/userSignIn"

describe("As a user visiting the plans list page", () => {
  const { baseUrl } = Cypress.config()

  const seeder = new CypressSeeder()

  const visitPage = () => {
    cy.visit(`${baseUrl}/plans`)
  }

  beforeEach(() => {
    seeder.seed()
  })

  it("If I view the page, plan tiles show the correct plan name", () => {
    visitPage()
    cy.get(".plan-tile")
    cy.contains("plan")
  })

  it("If I view the page, plan tiles will show the correct image", () => {
    visitPage()
    cy.get(".plan-tile")
    cy.get("img")
      .should("be.visible")
  })

  it("If I view the page, plan tiles will show the correct player count", () => {
    visitPage()
    cy.get(".plan-tile")
    cy.contains("0 / 2 players")
  })


  it("If I view the page, plan tiles show the correct user", () => {
    visitPage()
    cy.get(".plan-tile")
    cy.contains(seeder.user.username)
  })

  it("If I am not signed in, a button to make a new plan will appear", () => {
    visitPage()
    cy.get("#host-button")
      .should("not.exist")
  })

  describe("As a signed in user visiting the page,", () => {

    it("I can view button to make a new plan", () => {
      userSignIn(seeder.user, baseUrl)
      visitPage()
      cy.get("#host-button")
      cy.should("have.text", "Host a new game night")
    })

  })


})