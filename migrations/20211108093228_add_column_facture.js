
exports.up = function(knex) {
    return knex.schema.table("facture", (table) => {
        table.string("numero_check")
  
      });
};

exports.down = function(knex) {
    return knex.schema.table("facture", (table) => {
        table.dropColumn("numero_check");
  
      });
};