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
}

module.exports = Plan