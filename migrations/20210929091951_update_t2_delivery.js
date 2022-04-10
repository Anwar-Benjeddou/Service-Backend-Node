exports.up = function (knex) {
    return knex.schema.table("colis", (table) => {
      table.integer("etat_final").default(0);

    }).table("delivery", (table) => {
        table.integer("check_retour").default(0);
        table.dateTime("date_check_retour");
 
  
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("colis", (table) => {
      table.dropColumn("etat_final");

    }).table("delivery", (table) => {
        table.dropColumn("check_retour");
        table.dropColumn("date_check_retour");

  
      })
  };
  