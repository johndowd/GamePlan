const Model = require("./Model")

class Friendship extends Model {
  static get tableName() {
    return "friendships"
  }


  static get relationMappings() {
    const { User } = require("./index")

    return {
      // users: {
      //   Model: Model.HasManyRelation,
      //   modelClass: User,
      //   from: ["friends.user_one_id", "friends.user_two_id"],
      //   to: "users.id"
      // }
    }
  }

}

module.exports = Friendship