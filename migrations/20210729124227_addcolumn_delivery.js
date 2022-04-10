exports.up = function (knex) {
  return knex.schema.table("delivery", (table) => {
    table.integer("tentatif").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table("delivery", (table) => {
    table.dropColumn("tentatif");
  });
};
