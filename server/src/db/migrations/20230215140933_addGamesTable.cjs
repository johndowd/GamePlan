/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("games", table => {
    table.bigIncrements("id")
    table.string("name").notNullable().unique()
    table.string("image_url")
    table.integer("max_players").notNullable()
    table.string("description", 5000)
    table.string("BGAApiId")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log('rolling back games');
  return knex.schema.dropTableIfExists("games")
}
