const Model = require("./Model")

class Personality extends Model {
  static get tableName() {
    return "personalities"
  }
}

module.exports = Personality