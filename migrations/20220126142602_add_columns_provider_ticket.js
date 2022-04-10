exports.up = function(knex) {
    return knex.schema.table("ticket", (table) => {
        table.uuid("provider").references("id").inTable("provider");

      });
};

exports.down = function(knex) {
    return knex.schema.table("ticket", (table) => {
        table.dropColumn("provider")


      });
};