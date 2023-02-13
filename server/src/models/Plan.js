const Model = require("./Model")

class Plan extends Model {
  
  static get tableName() {
    return "plans"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "game", "genre", "location", "date"],
      properties: {
        name: { type: "string" },
        game: { type: "string" },
        genre: { type: "string" },
        playerCount: { type: ["integer","string"] },
        location: { type: "string" },
        date: { type: "string" }
      }
    }
  }
}

module.exports = Plan