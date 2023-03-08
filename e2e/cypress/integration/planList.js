/// <reference types="Cypress" />
import testData from "../fixtures/testData.json"

describe("As a user visiting the page", () => {
  const { game, user } = testData
  const { baseUrl } = Cypress.config()

  const visitPage = () => {
    cy.visit(`${baseUrl}/plans`)
  }

  const userSignIn = () => {
    cy.visit(`${baseUrl}/user-sessions/new`)
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type(user.email);
      cy.findByLabelText("Password").type(user.password);
      cy.root().submit();
    })
  }

  beforeEach(() => {
    cy.task("db:truncate", ["User", "Game", "Plan"])
    cy.task("db:insert", {
      modelName: "User",
      json: user
    })
    cy.task("db:insert", {
      modelName: "Game",
      json: game
    })

    let dataId = {}
    cy.task("db:find", {
      modelName: "User", json: { username: "TheGoogz" }
    }).then(users => dataId = { ...dataId, user: users[0] })
      .then(() => {
        cy.task("db:find", {
          modelName: "Game", json: { name: "Battleship" }
        }).then(games => dataId = { ...dataId, game: games[0] })
      }).then(() => {
        const plan = {
          name: "plan",
          gameId: dataId.game.id,
          ownerUserId: dataId.user.id,
          location: "plan",
          date: new Date(2023031922222),
        }
        cy.task("db:insert", {
          modelName: 'Plan',
          json: plan
        })
      })
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
    userSignIn()
    visitPage()
    cy.get("#host-button")
    cy.should("have.text", "Host a new game night")
  })

})