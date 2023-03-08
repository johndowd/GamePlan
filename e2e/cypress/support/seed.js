/// <reference types="Cypress" />
import testData from "../fixtures/testData.json"

const seed = () => {
  const { game, user } = testData

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
}

export default seed