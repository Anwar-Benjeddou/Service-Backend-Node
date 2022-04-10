exports.up = function (knex) {
  return knex.schema.table("delivery", (table) => {
    table.integer("etat_payment").default(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table("delivery", (table) => {
    table.dropColumn("etat_payment");
  });
};
