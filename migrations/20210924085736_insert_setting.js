exports.up = function (knex) {
  return knex("setting").insert([
    {
      id: 2,
      nb_colis: 3000,
      nb_tentative: 3,
      num_facture: 3000,
      num_console: 3000,
      num_pickup: 3000,
    },
  ]);
};
exports.down = function (knex) {};
