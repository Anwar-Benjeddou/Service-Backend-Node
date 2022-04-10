exports.up = function (knex) {
  return knex.schema.table("facture_provider", (table) => {
    table.integer("status_facture").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table("facture_provider", (table) => {
    table.dropColumn("status_facture");
  });
};
