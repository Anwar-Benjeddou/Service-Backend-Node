
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // filename: "./dev.postgresql",
      host: "node12747-nordouest.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "CADomp80122",
      database: "nordouest",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "node12747-nordouest.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "i",
      database: "nordouest",
     
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "node12747-nordouest.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "CADomp80122",
      database: "nordouest",
    },
    pool: { 
      min: 2,
      max: 10,
    },
  },
};