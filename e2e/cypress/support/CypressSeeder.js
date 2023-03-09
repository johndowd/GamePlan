/// <reference types="Cypress" />
import testData from "../fixtures/testData.json"

class CypressSeeder {
  seed() {
    const { user, game } = testData

    cy.task("db:truncate", ["User", "Game", "Plan"])
    cy.task("db:insert", {
      modelName: "User",
      json: user
    })
    cy.task("db:insert", {
      modelName: "Game",
      json: game
    })
    cy.task("db:find", {
      modelName: "User", json: { username: "TheGoogz" }
    }).then(users => this.user = {
      ...users[0],
      password: user.password
    })
      .then(() => {
        cy.task("db:find", {
          modelName: "Game", json: { name: "Battleship" }
        }).then(games => this.game = games[0])
      }).then(() => {
        const plan = {
          name: "test plan",
          gameId: this.game.id,
          ownerUserId: this.user.id,
          location: "Boston Public Library",
          address: "700 Boylston St, Boston MA 02134",
          date: new Date(2023031922222),
        }
        cy.task("db:insert", {
          modelName: 'Plan',
          json: plan
        }).then(() => {
          cy.task("db:find", {
            modelName: "Plan",
            json: {
              name: "test plan"
            }
          }).then(plans => this.plan = plans[0])
        })
      })
    this.signupSeed
  }

  signupSeed() {
    cy.task("db:insert", {
      modelName: "Signup",
      json: {
        userId: this.user.id,
        planId: this.plan.id
      }
    })
  }

  commentSeed() {
    cy.task("db:insert", {
      modelName: "Comment",
      json: {
        text: "Love this game!",
        userId: this.user.id,
        planId: this.plan.id
      }
    })
  }

}

export default CypressSeeder