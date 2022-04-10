exports.up = function (knex) {
  return knex.schema.table("anomaly_delivery", (table) => {
    table.string("note");
  });
};

exports.down = function (knex) {
  return knex.schema.table("anomaly_delivery", (table) => {
    table.dropColumn("note");
  });
};
