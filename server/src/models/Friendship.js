const Model = require("./Model")

class Friendship extends Model {
  static get tableName() {
    return "friendships"
  }
}

module.exports = Friendship