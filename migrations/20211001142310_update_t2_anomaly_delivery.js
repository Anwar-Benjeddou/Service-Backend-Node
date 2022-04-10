
exports.up = function (knex) {
    return knex.schema.table("anomaly_delivery", (table) => {
      table.uuid("agence");

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("anomaly_delivery", (table) => {
      table.dropColumn("agence");

    })
  };
  