/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Friendship = require("./Friendship");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }


  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username"],
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        username: { type: "string", minLength: 3, maxLength: 25 },
        image_url: { type: "string" },
        isAi: { type: "boolean" },
        isAdmin: { type: "boolean" }
      },
    }
  }

  static get relationMappings() {
    const { Plan, User, Friendship, Behavior } = require("./index")

    return {
      plans: {
        relation: Model.ManyToManyRelation,
        modelClass: Plan,
        join: {
          from: "users.id",
          through: {
            from: "signups.userId",
            to: "signups.planId"
          },
          to: "plans.id"
        }
      },
      plansOwned: {
        relation: Model.HasManyRelation,
        modelClass: Plan,
        join: {
          from: "users.id",
          to: "plans.ownerUserId"
        }
      },
      friendshipsForFriender: {
        relation: Model.HasManyRelation,
        modelClass: Friendship,
        join: {
          from: "users.id",
          to: "friendships.frienderId"
        }
      },
      friendsForFriender: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "users.id",
          through: {
            from: "friendships.frienderId",
            to: "friendships.friendeeId"
          },
          to: "users.id"
        }
      },
      friendshipsForFriendee: {
        relation: Model.HasManyRelation,
        modelClass: Friendship,
        join: {
          from: "users.id",
          to: "friendships.friendeeId"
        }
      },
      friendsForFriendee: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "users.id",
          through: {
            from: "friendships.friendeeId",
            to: "friendships.frienderId"
          },
          to: "users.id"
        }
      },
      behaviors: {
        relation: Model.ManyToManyRelation,
        modelClass: Behavior,
        join: {
          from: "users.id",
          through: {
            from: "personalities.userId",
            to: "personalities.behaviorId"
          },
          to: "behaviors.id"
        }
      }
    }
  }

  async addFriend(user) {
    const newFriendship = await Friendship.query().insert({ frienderId: this.id, friendeeId: user.id })
    const newFriend = await User.query().findById(newFriendship.friendeeId)
    return this
  }

  async getFriends() {
    const frienderFriends = await this.$relatedQuery("friendsForFriender")
    const friendeeFriends = await this.$relatedQuery("friendsForFriendee")
    const friends = frienderFriends.concat(friendeeFriends)
    return friends
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static async getRandomAiUser() {
    const users = await User.query().where({ isAi: true })
    const rand = Math.floor(Math.random() * users.length)
    return users[rand]
  }
}

module.exports = User;
