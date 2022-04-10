exports.up = function (knex) {
  return knex.schema.createTable("facture_provider", function (table) {
    table.uuid("id").notNullable().primary();
    table.string("code_facture");
    table.uuid("provider").references("id").inTable("provider");
    table.integer("nb_colis");

    table.double("frais_livraision");

    table.double("frais_total");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
