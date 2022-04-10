exports.up = function (knex) {
  return knex.schema.table("ticket", (table) => {
    table.string("priority");
  });
};

exports.down = function (knex) {
  return knex.schema.table("ticket", (table) => {
    table.dropColumn("priority");
  });
};
