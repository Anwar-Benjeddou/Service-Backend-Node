exports.up = function (knex) {
  return knex.schema.createTable("provider_pickup", function (table) {
    table.uuid("id").notNullable().primary();
    table.uuid("driver").references("id").inTable("driver");
    table.uuid("provider").references("id").inTable("provider");
    table.integer("quantity");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
