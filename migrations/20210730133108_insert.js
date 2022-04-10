exports.up = function (knex) {
  return Promise.all([
    knex("agence").insert([
      {
        id: "1ba24600-e0c9-11eb-abdd-014ed3bc7a03",
        name: "agenceA",
        phone_number: 22232122,
        address: "A",
        city: "A",
      },
    ]),

    knex("app_user").insert([
      {
        id: "3ba24600-e0c9-11eb-abdd-014ed3bc7a04",
        firstname: "admin",
        lastname: "admin",
        phone_number: 55432123,
        username: "admin",
        email: "admin@gmail.com",
        address: "TUNIS",
        descriminator: "REGUALR_USER",
        password: "123",
        agence: "1ba24600-e0c9-11eb-abdd-014ed3bc7a03",
      },
    ]),
    knex("permission").insert([
      {
        id: "3ba24600-e0c9-11eb-abdd-014ed3bc7a04",
        name: "ALL",
      },
    ]),
    knex("user_permission").insert([
      {
        users: "3ba24600-e0c9-11eb-abdd-014ed3bc7a04",
        permissions: "3ba24600-e0c9-11eb-abdd-014ed3bc7a04",
      },
    ]),

    knex("privilege").insert([
      {
        id: "3ba24600-e0c9-11eb-abdd-014ed3bc7a06",
        name: "admin",
        description: "admin agence",
      },
    ]),

    knex("user_privilege").insert([
      {
        users: "3ba24600-e0c9-11eb-abdd-014ed3bc7a04",
        privileges: "3ba24600-e0c9-11eb-abdd-014ed3bc7a06",
      },
    ]),
  ]);
};

exports.down = function (knex) {};
