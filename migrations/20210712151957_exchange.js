exports.up = function (knex) {
  return knex.schema.createTable("console", function (table) {
    table.uuid("id").notNullable().primary();
    table.uuid("driver").references("id").inTable("driver");
    table.string("code");
    table.integer("status_console").defaultTo(0);
    table.integer("status_anomaly").defaultTo(0);
    table.integer("status_console_Delivery").defaultTo(0);
    table.uuid("from_agence").references("id").inTable("agence");
    table.uuid("to_agence").references("id").inTable("agence");
    table.uuid("magasinier_from").references("id").inTable("app_user");
    table.uuid("magasinier_to").references("id").inTable("app_user");
    table.integer("check_magasinier_to").defaultTo(0);
    table.integer("check_magasinier_from").defaultTo(0);
    table.integer("quantity").defaultTo(0);
    table.dateTime("date_check_magasinier_from");
    table.dateTime("date_check_magasinier_to");
    table.uuid("colis").references("id").inTable("colis");
    table.dateTime("date_console");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
