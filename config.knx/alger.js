module.exports = {
    development: {
      client: "postgresql",
      connection: {
        // filename: "./dev.postgresql",
        host: "node13126-iysaal-alger.my.p4d.click",
        port: "5432",
        user: "webadmin",
        password: "OBQfnt46407",
        database: "algDB",
      },
    },
  
    staging: {
      client: "postgresql",
      connection: {
        host: "127.0.0.1",
        port: "5432",
        user: "postgres",
        password: "DGAvem61651",
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