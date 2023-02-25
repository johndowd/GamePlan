/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("plans", table => {
    table.string("address")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log('rolling back address column');
  return knex.schema.table("plans", table => {
    table.dropColumn("address")
  })
}