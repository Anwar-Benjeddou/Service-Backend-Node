exports.up = function (knex) {
  return knex.schema.table("delivery", (table) => {
    table.dateTime("date_replanification");
  });
};

exports.down = function (knex) {
  return knex.schema.table("delivery", (table) => {
    table.dropColumn("date_replanification");
  });
};
