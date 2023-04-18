const Model = require("./Model")

class Behavior extends Model {
  static get tableName() {
    return "behaviors"
  }

  static get relationMappings() {
    const { User } = require("./index.js")
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "behaviors.id",
          through: {
            from: "personalities.behaviorId",
            to: "personalities.userId"
          },
          to: "users.id"
        }
      }
    }
  }

}

module.exports = Behavior