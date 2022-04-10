module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // filename: "./dev.postgresql",
      host: "node12364-khedhri-livraison-test.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "BPShav36687",
      database: "DB_TEST",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "node12364-khedhri-livraison-test.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "BPShav36687",
      database: "DB_TEST",
     
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "node12364-khedhri-livraison-test.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "BPShav36687",
      database: "DB_TEST",
    },
    pool: { 
      min: 2,
      max: 10,
    },
  },
};