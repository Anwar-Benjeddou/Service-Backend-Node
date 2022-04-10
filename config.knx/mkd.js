module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // filename: "./dev.postgresql",
      host: "node13193-mkd-backend.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "RGDnsg38151",
      database: "mkd_databse",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      port: "5432",
      user: "postgres",
      password: "XLLldd11124",
      database: "Logistic",
     
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "node13072-sonic.my.p4d.click ",
      port: "5432",
      user: "webadmin",
      password: "DGAvem61651",
      database: "Logistic",
    },
    pool: { 
      min: 2,
      max: 10,
    },
  },
};