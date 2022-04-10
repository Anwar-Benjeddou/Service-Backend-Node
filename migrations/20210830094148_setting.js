exports.up = function (knex) {
  return knex.schema.createTable("setting", function (table) {
    table.increments("id").notNullable().primary();
    table.integer("num_facture").default(1);
    table.integer("num_console").default(2);
    table.integer("num_pickup").default(1);
    table.integer("nb_colis").default(1);
    table.integer("nb_tentative").default(2);
  });
};

exports.down = function (knex) {};
