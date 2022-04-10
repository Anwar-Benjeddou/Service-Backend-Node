
exports.up = function(knex) {
    return knex.schema
    .createTable("article_magasin", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("description");
      table.integer("defaultvalue");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("spending", function (table) {
        table.uuid("id").notNullable().primary();
        table.string("outlay");
        table.string("outlay_for");
        table.integer("value");
        table.integer("status").defaultTo(0);
        table.uuid("article_magasin").references("id").inTable("article_magasin");
        table.uuid("user").references("id").inTable("app_user");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
};

exports.down = function(knex) {
  
};
