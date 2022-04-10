module.exports = {
    development: {
      client: "postgresql",
      connection: {
        // filename: "./dev.postgresql",
        host: "node12502-env-tudex.my.p4d.click",
        port: "5432",
        user: "webadmin",
        password: "ORKxme37637",
        database: "TudexPROD",
      },
    },
  
    staging: {
      client: "postgresql",
      connection: {
        host: "node12502-env-tudex.my.p4d.click",
        port: "5432",
        user: "webadmin",
        password: "ORKxme37637",
        database: "TudexPROD",
       
      },
      pool: {
        min: 2,
        max: 10,
      },
    },
  
    production: {
      client: "postgresql",
      connection: {
        host: "node12502-env-tudex.my.p4d.click",
        port: "5432",
        user: "webadmin",
        password: "ORKxme37637",
        database: "TudexPROD",
      },
      pool: { 
        min: 2,
        max: 10,
      },
    },
  };
  
  
  
  
  