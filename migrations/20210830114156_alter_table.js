exports.up = function (knex) {
  return knex.schema.table("colis", (table) => {
    table.bigint("index_colis");
  });
};

exports.down = function (knex) {
  return knex.schema.table("colis", (table) => {
    table.dropColumn("index_colis");
  });
};
