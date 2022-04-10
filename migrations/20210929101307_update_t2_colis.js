exports.up = function (knex) {
    return knex.schema.table("colis", (table) => {
      table.uuid("agence_transfert");

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("colis", (table) => {
      table.dropColumn("agence_transfert");

    })
  };
  