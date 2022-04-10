module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // filename: "./dev.postgresql",
      host: "node12315-env-iysaal.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "ROAxeq84217",
      database: "FASTBOX_PROD_STABLE",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "node12315-env-iysaal.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "ROAxeq84217",
      database: "FASTBOX_PROD_STABLE",
     
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "node12315-env-iysaal.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "ROAxeq84217",
      database: "FASTBOX_PROD_STABLE",
    },
    pool: { 
      min: 2,
      max: 10,
    },
  },
};