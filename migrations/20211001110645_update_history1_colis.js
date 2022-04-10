
exports.up = function (knex) {
    return knex.schema.table("colis_history", (table) => {
      table.uuid("agence");

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("colis_history", (table) => {
      table.dropColumn("agence");

    })
  };
  