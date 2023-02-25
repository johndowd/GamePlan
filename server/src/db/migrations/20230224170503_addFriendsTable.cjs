/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("friendships", table => {
    table.bigIncrements("id");
    table.bigInteger("frienderId").unsigned().index().references("users.id").onDelete("CASCADE")
    table.bigInteger("friendeeId").unsigned().index().references("users.id").onDelete("CASCADE")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log('rolling back friendships');
  return knex.schema.dropTableIfExists("friendships")
}
