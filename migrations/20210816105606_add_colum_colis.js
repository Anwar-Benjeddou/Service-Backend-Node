exports.up = function (knex) {
  return knex.schema.table("colis", (table) => {
    table.uuid("zone").references("id").inTable("zone");
    table.integer("lot");
  });
};

exports.down = function (knex) {
  return knex.schema.table("colis", (table) => {
    table.dropColumn("zone").references("zone").inTable("zone");
    table.dropColumn("lot");
  });
};
