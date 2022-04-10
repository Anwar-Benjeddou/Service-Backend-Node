exports.up = function (knex) {
  return knex.schema.table("facture", (table) => {
    table.string("code");
  });
};

exports.down = function (knex) {
  return knex.schema.table("facture", (table) => {
    table.dropColumn("code");
  });
};
