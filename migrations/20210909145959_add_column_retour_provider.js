exports.up = function (knex) {
  return knex.schema.table("retour_provider", (table) => {
    table.uuid("provider").references("id").inTable("provider");
  });
};

exports.down = function (knex) {
  return knex.schema.table("retour_provider", (table) => {
    table.dropColumn("provider");
  });
};
