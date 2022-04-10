exports.up = function(knex) {
    return knex.schema.table("article_magasin", (table) => {
        table.string("code");


      });
};

exports.down = function(knex) {
 
};