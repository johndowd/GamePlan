/// <reference types="Cypress" />
import testData from "../fixtures/testData.json"
import seed from "../support/seed"
import userSignIn from "../support/userrSignIn"

describe("As a user visiting the plans list page", () => {
  const { game, user } = testData
  const { baseUrl } = Cypress.config()

  const visitPage = () => {
    cy.visit(`${baseUrl}/plans`)
  }

  beforeEach(() => {
    seed()
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
    cy.contains(user.username)
  })

  it("If I am not signed in, a button to make a new plan will appear", () => {
    visitPage()
    cy.get("#host-button")
      .should("not.exist")
  })

  it("If I am  signed in, a button to make a new plan will appear", () => {
    userSignIn(user, baseUrl)
    visitPage()
    cy.get("#host-button")
    cy.should("have.text", "Host a new game night")
  })

})