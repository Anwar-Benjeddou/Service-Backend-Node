exports.up = function (knex) {
  return knex.schema.createTable("anomaly_delivery", function (table) {
    table.uuid("id").notNullable().primary();
    table.uuid("colis").references("id").inTable("colis");
    table.uuid("driver").references("id").inTable("driver");
    table.uuid("anomaly").references("id").inTable("anomaly_message");
    table.integer("status_replanifier").defaultTo(0);

    table.string("image");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
