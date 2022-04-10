exports.up = function (knex) {
    return knex.schema
      .createTable("retour_agence_bk", function (table) {
        table.uuid("id").notNullable().primary();
        table.uuid("colis").references("id").inTable("colis");
        table.uuid("driver").references("id").inTable("driver");
        table.integer("retour_status").defaultTo(0);
        table.uuid("agence_to").references("id").inTable("agence");
        table.uuid("agence_from").references("id").inTable("agence");
        table.timestamp("return_date").defaultTo(knex.fn.now());
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      .createTable("retour_provider_bk", function (table) {
        table.uuid("id").notNullable().primary();
        table.uuid("colis").references("id").inTable("colis");
        table.uuid("driver").references("id").inTable("driver");
        table.uuid("agence_provider").references("id").inTable("agence");
        table.timestamp("return_date").defaultTo(knex.fn.now());
        table.integer("retour_status").defaultTo(0);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.uuid("provider").references("id").inTable("provider");
        table.integer("validate_retour").default(1);
        table.dateTime("date_validate_retour");
      });
  };
  
  exports.down = function (knex) {};
  