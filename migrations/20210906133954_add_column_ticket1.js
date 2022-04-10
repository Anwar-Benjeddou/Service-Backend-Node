exports.up = function (knex) {
  return knex.schema.table("ticket", (table) => {
    table.string("value");
  });
};

exports.down = function (knex) {
  return knex.schema.table("ticket", (table) => {
    table.dropColumn("value");
  });
};
