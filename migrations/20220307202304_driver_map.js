exports.up = function(knex) {
    return knex.schema.table("location_driver", (table) => {
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.string("actions");


      });
};

exports.down = function(knex) {
 
};