/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("comments", table => {
    table.bigIncrements("id")
    table.string("text", 2048)
    table.bigInteger("userId")
      .unsigned()
      .notNullable()
      .index()
      .references("users.id")
    table.bigInteger("planId")
      .unsigned()
      .notNullable()
      .index()
      .references("plans.id")
    table.timestamp("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("comments")
}
