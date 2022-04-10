exports.up = function (knex) {
  return knex.schema.table("provider", (table) => {
    table.string("type_facture");
  });
};

exports.down = function (knex) {
  return knex.schema.table("provider", (table) => {
    table.dropColumn("type_facture");
  });
};
