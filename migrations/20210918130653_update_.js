exports.up = function (knex) {
  return knex.schema.table("pickup", (table) => {
    table.dateTime("date_replanification");
  });
};

exports.down = function (knex) {
  return knex.schema.table("pickup", (table) => {
    table.dropColumn("date_replanification");
  });
};
