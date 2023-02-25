/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("plans", table => {
    table.dropColumn("game")
    table.dropColumn("genre")
    table.dropColumn("playerCount")
    table.integer("gameId")
      .notNullable()
      .index()
      .references("games.id")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log('rolling back plans columns edit');
  return knex.schema.table("plans", table => {
    table.string("game")
    table.string("genre")
    table.integer("playerCount")
    table.dropColumn("gameId")
  })
}
