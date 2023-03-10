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
        ownerUserId: { type: ["string", "integer"] },
        address: { type: "string" },
        location: { type: "string" },
        date: { type: ["object", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { User, Game, Comment } = require("./index.js")
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
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "plans.id",
          to: "comments.planId"
        }
      }
    }
  }

  static async search(plans, query) {
    const searchedPlans = plans.filter(plan => {
      for (const key in plan) {
        if (typeof plan[key] == 'string') {
          if (plan[key].toLowerCase().includes(query.toLowerCase())) {
            return plan
          }
        }
      }
      const { game } = plan
      for (const key in game) {
        if (typeof game[key] == 'string') {
          if (game[key].toLowerCase().includes(query.toLowerCase())) {
            return plan
          }
        }
      }
      const { players } = plan
      for (const player of players) {
        if (player.username.toLowerCase().includes(query.toLowerCase())) {
          return plan
        }
      }
    })
    return searchedPlans
  }
}

module.exports = Plan