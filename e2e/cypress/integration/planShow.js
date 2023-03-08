/// <reference types="Cypress" />
import testData from "../fixtures/testData.json"
import seed from "../support/seed"

describe("As a user visiting the plans show page", () => {
  const { game, user, plan } = testData
  const { baseUrl } = Cypress.config()

  const test = {}

  const visitPage = (id) => {
    cy.visit(`${baseUrl}/plans/${id}`)
  }

  beforeEach(() => {
    seed()
    const plan = cy.task("db:find", {
      modelName: "Plan",
      json: { name: "plan" }
    }).then(plans => test.plan = plans[0])
  })

  it("If I view the page, I see the name of the plan at the top of the page", () => {
    visitPage(test.plan.id)
    cy.get(".plan-show-page")
      .find("h1")
      .contains("plan")
  })

  it("If I view the page, I view the name of the correct owner", () => {
    visitPage(test.plan.id)
    cy.wait(1000)
    cy.get(".plan-show-page")
      .find(".user-tile")
      .first()
      .contains(user.username)
  })
})