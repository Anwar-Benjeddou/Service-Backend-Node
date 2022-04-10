exports.up = function (knex) {
  return knex.schema.table("delivery", (table) => {
    table.integer("check_replanification").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table("delivery", (table) => {
    table.dropColumn("check_replanification");
  });
};
