exports.up = function (knex) {
    return knex.schema.createTable("require_payment", function (table) {
      table.uuid("id").notNullable().primary();
      table.uuid("provider").references("id").inTable("provider");
      table.integer("process").defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {};
  