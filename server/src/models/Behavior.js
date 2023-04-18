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

  static async getRandomBehavior() {
    const behaviors = await Behavior.query()
    const index = Math.floor(Math.random() * behaviors.length)
    return behaviors[index]
  }

  static async getTwoRandomBehaviors() {
    const behaviors = await Behavior.query()

    let x, y;
    do {
      x = Math.floor(Math.random() * behaviors.length);
      y = Math.floor(Math.random() * behaviors.length);
    } while (x === y);

    return [behaviors[x], behaviors[y]]
  }
}

module.exports = Behavior