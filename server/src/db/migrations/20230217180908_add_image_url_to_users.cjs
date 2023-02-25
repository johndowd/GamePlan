/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("users", table => {
    table.string("image_url").defaultTo("https://gameplan-jd-development.s3.us-east-2.amazonaws.com/blank-profile-picture-973460_1280.webp")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  console.log('rolling back image column');
  return knex.schema.table("users", table => {
    table.dropColumn("image_url")
  })
}
