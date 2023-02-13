const Model = require("./Model")

class Signup extends Model {
  static get tableName() {
    return "signups"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "planId"],
      properties: {
        userId: { type: ["integer", "string"] },
        planId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    return {

    }
  }
}

module.exports = Signup