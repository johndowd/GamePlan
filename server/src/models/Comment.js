const Model = require("./Model")

class Comment extends Model {
  static get tableName() {
    return "comments"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text"],
      properties: {
        text: { type: "string" },
        userId: { type: ["string", "integer"] },
        planId: { type: ["string", "integer"] },
      }
    }
  }

  static get relationMappings() {
    const { User, Plan } = require("./index")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.userId",
          to: "users.id"
        }
      },
      plan: {
        relation: Model.BelongsToOneRelation,
        modelClass: Plan,
        join: {
          from: "comments.planId",
          to: "plans.id"
        }
      }
    }
  }
}

module.exports = Comment