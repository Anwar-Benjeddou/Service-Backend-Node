exports.up = function (knex) {
  return knex.schema
    .createTable("location_driver", function (table) {
      table.uuid("id").notNullable().primary();
      table.uuid("driver").references("id").inTable("driver");
      table.double("latitude").defaultTo(0);
      table.double("longitude").defaultTo(0);
    })
    .createTable("location_colis", function (table) {
      table.uuid("id").notNullable().primary();
      table.uuid("colis").references("id").inTable("colis");
      table.double("latitude").defaultTo(0);
      table.double("longitude").defaultTo(0);
    });
};
exports.down = function (knex) {};
