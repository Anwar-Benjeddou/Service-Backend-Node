exports.up = function (knex) {
    return knex.schema.alterTable("facture", (table) => {
      table.string("mode_payment").alter();
    });
  };

  exports.down = function (knex) {
    return knex.schema.alterTable("facture", (table) => {
      table.string("mode_payment").alter();
    });
  };