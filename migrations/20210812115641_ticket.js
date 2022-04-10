exports.up = function (knex) {
  return knex.schema.createTable("ticket", function (table) {
    table.uuid("id").notNullable().primary();
    table.uuid("colis").references("id").inTable("colis");
    table.integer("status").defaultTo(0);
    table.string("type");
    table.string("message");

    table.string("code");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
