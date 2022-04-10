exports.up = function (knex) {
  return knex.schema.table("facture", (table) => {
    table.integer("payment_status_driver").default(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table("facture", (table) => {
    table.dropColumn("payment_status_driver");
  });
};
