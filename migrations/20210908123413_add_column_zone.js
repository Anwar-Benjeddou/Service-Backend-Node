exports.up = function (knex) {
  return knex.schema.table("zone", (table) => {
    table.string("gouvernorat");
  });
};

exports.down = function (knex) {
  return knex.schema.table("zone", (table) => {
    table.dropColumn("gouvernorat");
  });
};
