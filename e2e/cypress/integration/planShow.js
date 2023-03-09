/// <reference types="Cypress" />
import testData from "../fixtures/testData.json"
import CypressSeeder from "../support/CypressSeeder"
import userSignIn from "../support/userSignIn"

describe("As a user visiting the plans show page", () => {
  const { baseUrl } = Cypress.config()

  const seeder = new CypressSeeder()

  const visitPage = (id) => {
    cy.visit(`${baseUrl}/plans/${id}`)
  }

  beforeEach(() => {
    seeder.seed()
  })

  it("If I view the page, I see the name of the plan at the top of the page", () => {
    visitPage(seeder.plan.id)
    cy.get(".plan-show-page")
      .find("h1")
      .contains("plan")
  })

  it("If I view the page, I view the name of the correct owner", () => {
    visitPage(seeder.plan.id)
    cy.wait(500)
    cy.get(".plan-show-page")
      .find(".user-tile")
      .first()
      .contains(seeder.user.username)
  })

  it("If I view the page, I can see a map", () => {
    visitPage(seeder.plan.id)
    cy.wait(1500)
    cy.get("#map")
      .should("exist")
  })

  it("If I view the page, I can view who is playing the game", () => {
    seeder.signupSeed()
    visitPage(seeder.plan.id)
    cy.wait(500)
    cy.get(".player-list")
      .find(".user-tile-small")
      .first()
      .contains("TheGoogz")
  })

  it("If I view the page, I can view a comment", () => {
    seeder.commentSeed()
    visitPage(seeder.plan.id)
    cy.get(".comment-tile")
      .contains("Love this game!")
  })

  describe("As a signed in user visiting the page", () => {
    it("If I view the page, I should view a button to join the plan", () => {
      userSignIn(seeder.user, baseUrl)
      visitPage(seeder.plan.id)
      cy.wait(500)
      cy.get(".button")
        .contains("Click to join this game")
        .should("exist")
    })

    it("If I view the page, I should be able to leave comments", () => {
      userSignIn(seeder.user, baseUrl)
      visitPage(seeder.plan.id)
      cy.wait(500)
      cy.get("form").within(() => {
        cy.get("input").type("testing")
        cy.root().submit()
      })
      cy.get(".comment-tile")
        .contains("testing")
    })

  })
})