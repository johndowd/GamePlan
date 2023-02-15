/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
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
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$"},
        cryptedPassword: { type: "string" },
        username: { type: "string" }
      },
    }
  }

  static get relationMappings() {
    const { Signup, Plan, User } = require("./index")

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
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
