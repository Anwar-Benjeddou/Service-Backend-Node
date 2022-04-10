exports.up = function (knex) {
  return knex.schema

    .createTable("colis_history_bk", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("action");
      table.string("actionneurs");
      table.string("event");
      table.uuid("colis").references("id").inTable("colis");
      table.integer("vu_provider").default(0);
      table.integer("vu_global").default(0);
      table.uuid("agence");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("pickup_bk", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("code");
      table.integer("status_pickup").defaultTo(0);
      table.integer("check_magasinier").defaultTo(0);
      table.integer("status_anomaly").defaultTo(0);
      table.integer("check_replanification").defaultTo(0);
      table.dateTime("date_check_magasinier");
      table.dateTime("date_enlevement");
      table.dateTime("date_enlevement_souhaiter");
      table.dateTime("date_replanification");

      table.uuid("colis").unique().references("id").inTable("colis");
      table.uuid("driver").references("id").inTable("driver");
      table.uuid("magasinier").references("id").inTable("app_user");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("delivery_bk", function (table) {
      table.uuid("id").notNullable().primary();
      table.uuid("driver").references("id").inTable("driver");
      table.uuid("colis").unique().references("id").inTable("colis")
      table.string("code");
      table.integer("status_delivery").defaultTo(0);
      table.integer("status_anomaly").defaultTo(0);
      table.string("agence_exchange");
      table.integer("check_magasinier").defaultTo(0);
      table.integer("tentatif").defaultTo(0);

      table.uuid("magasinier").references("id").inTable("app_user");
      table.dateTime("date_check_magasinier");
      table.dateTime("date_replanification");

      table.dateTime("date_livraision");
      table.integer("check_retour").default(0);
      table.dateTime("date_check_retour");
      table.integer("etat_payment").default(0);
      table.integer("check_replanification").defaultTo(0);

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("console_bk", function (table) {
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
