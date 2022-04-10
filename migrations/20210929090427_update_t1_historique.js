exports.up = function (knex) {
    return knex.schema.table("colis_history", (table) => {
      table.integer("vu_provider").default(0);
      table.integer("vu_global").default(0);

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("colis_history", (table) => {
      table.dropColumn("vu_provider");
      table.dropColumn("vu_global");

    });
  };
  