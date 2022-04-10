exports.up = function (knex) {
  return knex.schema.table("driver", (table) => {
    table.double("frais_livraision");
  });
};

exports.down = function (knex) {
  return knex.schema.table("driver", (table) => {
    table.dropColumn("frais_livraision");
  });
};
