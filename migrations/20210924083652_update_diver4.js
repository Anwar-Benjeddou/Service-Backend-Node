exports.up = function (knex) {
  return knex.schema.table("driver", (table) => {
    table.double("colis_price");
  });
};

exports.down = function (knex) {
  return knex.schema.table("driver", (table) => {
    table.dropColumn("colis_price");
  });
};
