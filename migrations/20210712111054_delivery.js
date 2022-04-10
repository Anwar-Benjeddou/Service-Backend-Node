exports.up = function (knex) {
  return knex.schema.createTable("delivery", function (table) {
    table.uuid("id").notNullable().primary();
    table.uuid("driver").references("id").inTable("driver");
    table.uuid("colis").references("id").inTable("colis");
    table.string("code");
    table.integer("status_delivery").defaultTo(0);
    table.integer("status_anomaly").defaultTo(0);
    table.string("agence_exchange");
    table.integer("check_magasinier").defaultTo(0);

    table.uuid("magasinier").references("id").inTable("app_user");
    table.dateTime("date_check_magasinier");

    table.dateTime("date_livraision");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
