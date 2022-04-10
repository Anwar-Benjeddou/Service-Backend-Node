exports.up = function (knex) {
  return knex.schema.alterTable("pickup", (table) => {
    table.integer("status_pickup").defaultTo(0).alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("pickup", (table) => {
    table.integer("status_pickup").defaultTo(0).alter();
  });
};
