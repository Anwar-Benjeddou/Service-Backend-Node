exports.up = function (knex) {
    return knex.schema.table("colis", (table) => {
      table.integer("validate_retour").default(0);


    }).table("retour_provider", (table) => {
        table.integer("validate_retour").default(1);
        table.dateTime("date_validate_retour");
 
  
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("colis", (table) => {
      table.dropColumn("retour");

    }).table("retour_provider", (table) => {
        table.dropColumn("validate_retour");
        table.dropColumn("date_validate_retour");

  
      })
  };