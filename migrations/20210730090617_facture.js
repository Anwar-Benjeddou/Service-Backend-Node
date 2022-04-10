exports.up = function (knex) {
  return knex.schema.createTable("facture", function (table) {
    table.uuid("id").notNullable().primary();
    table.uuid("colis").references("id").inTable("colis");
    table.uuid("provider").references("id").inTable("provider");
    table.integer("payment_status_provider").defaultTo(0);
    table.integer("payment_status_customer").defaultTo(0);
    table.integer("delivery_status").defaultTo(0);
    table.integer("prefacture_status").defaultTo(0);
    table.integer("mode_payment").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
