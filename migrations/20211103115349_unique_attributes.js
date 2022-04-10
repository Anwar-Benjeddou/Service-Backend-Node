exports.up = function (knex) {
    return knex.schema.alterTable('delivery', function(table) {
        table.uuid('colis').unique().alter();
    }).
    alterTable('pickup', function(table) {
        table.uuid('colis').unique().alter();
    }).
    alterTable('facture', function(table) {
        table.uuid('colis').unique().alter();
    }).
    alterTable('retour_provider', function(table) {
        table.uuid('colis').unique().alter();
    });
  };
  
  exports.down = function (knex) {
    
  };