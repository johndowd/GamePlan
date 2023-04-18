/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("behaviors", table => {
    table.bigIncrements("id")
    table.string("trait").notNullable().unique()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })

}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  // await knex.schema.dropTableIfExists("personalities")
  return knex.schema.dropTableIfExists("behaviors")
}
