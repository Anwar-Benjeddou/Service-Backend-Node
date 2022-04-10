exports.up = function (knex) {
  return knex.schema
    .alterTable("user_permission", (table) => {
      table.primary(["users", "permissions"]);
    })
    .alterTable("user_privilege", (table) => {
      table.primary(["users", "privileges"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable("user_permission", (table) => {
      table.primary(["users", "permissions"]);
    })
    .alterTable("user_privilege", (table) => {
      table.primary(["users", "privileges"]);
    });
};
