/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("plans", table => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("game").notNullable()
    table.string("genre").notNullable()
    table.integer("playerCount")
    table.string("location").notNullable()
    table.string("date").notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())

  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("plans")
}
