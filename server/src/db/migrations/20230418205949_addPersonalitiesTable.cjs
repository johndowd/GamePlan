/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("personalities", table => {
    table.bigIncrements("id")
    table.bigInteger("userId")
      .unsigned()
      .notNullable()
      .index()
      .references("users.id")
    table.bigInteger("behaviorId")
      .unsigned()
      .notNullable()
      .index()
      .references("behaviors.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("personalities")
}
