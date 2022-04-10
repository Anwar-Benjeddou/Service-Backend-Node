
exports.up = function(knex) {
    return knex.schema.table("agence", (table) => {
        table.integer("deleted").default(0);
  
      });
};

exports.down = function(knex) {
    return knex.schema.table("agence", (table) => {
        table.dropColumn("deleted");
  
      });
};
