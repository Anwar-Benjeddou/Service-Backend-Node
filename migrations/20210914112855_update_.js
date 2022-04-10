exports.up = function (knex) {
  return knex.schema.table("facture", (table) => {
    table.string("frais_livraision");
  });
};

exports.down = function (knex) {
  return knex.schema.table("facture", (table) => {
    table.dropColumn("frais_livraision");
  });
};
