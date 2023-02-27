const Model = require("./Model")

class Friendship extends Model {

  static get tableName() {
    return "friendships"
  }

  async $beforeInsert() {
    const friendships = await Friendship.query().where(this)
    if (friendships.length != 0) {
      throw { error: "Already friended this user" }
    }
  }
}

module.exports = Friendship