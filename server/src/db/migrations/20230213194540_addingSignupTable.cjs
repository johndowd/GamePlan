/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("signups", table => {
    table.bigIncrements("id")
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
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log('rolling back signups');
  return knex.schema.dropTableIfExists("signups")
}
