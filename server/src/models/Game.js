const Model = require("./Model")
const unique = require("objection-unique")

const uniqueFunc = unique({
  fields: ["name"],
  identifiers: ["id"]
})

class Game extends uniqueFunc(Model) {
  static get tableName() {
    return "games"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "max_players"],
      properties: {
        name: { type: "string" },
        image_url: { type: "string" },
        max_players: { type: ["string", "integer"] },
        description: { type: "string" },
        BGAApiId: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { Plan } = require("./index")
    return {
      plans: {
        relation: Model.HasManyRelation,
        modelClass: Plan,
        join: {
          from: "games.id",
          to: "plans.gameId"
        }
      }
    }
  }

  static async getTrending() {
    const allGames = await Game.query()
    const trendingGames = [allGames[0], allGames[1], allGames[2]]
    return trendingGames
  }

  static async search(query) {
    const gamesData = await Game.query()
    const games = gamesData.filter(game => {
      return game.name
        .toLowerCase()
        .includes(query.toLowerCase())
    })
    return games
  }

  static async getRandomGame() {
    const games = await Game.query()
    const rand = Math.floor(Math.random() * games.length)
    return games[rand]
  }
}

module.exports = Game