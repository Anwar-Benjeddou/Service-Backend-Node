exports.up = function (knex) {
  return knex.schema.table("anomaly_delivery", (table) => {
    table.uuid("check_user").references("id").inTable("app_user");
    table.integer("check_retour").defaultTo(0);
    table.dateTime("date_check_retour");
  });
};

exports.down = function (knex) {
  return knex.schema.table("anomaly_delivery", (table) => {
    table.dropColumn("check_user").references("id").inTable("app_user");
    table.dropColumn("check_retour").defaultTo(0);
    table.dropColumn("date_check_retour");
  });
};
