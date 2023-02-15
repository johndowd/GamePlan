const Model = require("./Model")

class Plan extends Model {

  static get tableName() {
    return "plans"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "gameId", "location", "date"],
      properties: {
        name: { type: "string" },
        gameId: { type: ["string", "integer"] },
        playerCount: { type: ["integer","string"] },
        location: { type: "string" },
        date: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { User, Game } = require("./index.js")
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "plans.id",
          through: {
            from: "signups.planId",
            to: "signups.userId"
          },
          to: "users.id"
        }
      },
      owner: { 
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "plans.ownerUserId",
          to: "users.id"
        }
      },
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "plans.gameId",
          to: "games.id"
        }
      }
    }
  }
}

module.exports = Plan