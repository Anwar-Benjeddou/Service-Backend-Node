
exports.up = function(knex) {
    return knex.schema.table("facture_provider", (table) => {
        table.string("order")
  
      });
};

exports.down = function(knex) {
    return knex.schema.table("facture_provider", (table) => {
        table.dropColumn("order");
  
      });
};