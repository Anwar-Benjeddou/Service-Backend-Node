exports.up = function (knex) {
  return knex.schema.table("colis", (table) => {
    table.string("code");
  });
};

exports.down = function (knex) {
  return knex.schema.table("colis", (table) => {
    table.dropColumn("code");
  });
};
