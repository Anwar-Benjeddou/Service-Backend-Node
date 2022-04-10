/* const env = {
  key: "MySuP3R_z3kr3t.",
  port: 3001,
  port1: 3002,

  databaseConfig: {
    client: "mysql",
    connection: {
      // host: "192.168.1.104",
      // host: "197.27.92.203",
      host: "node11857-env-3001198.my.p4d.click",
      user: "root",
      password: "QKCqel28161",
      database: "logistic",
    },
  },
  assetServerUrl: "http://localhost",
  assetDirectory: "\\home\\logistic258\\Documents\\ites\\logistic",
};

module.exports = env; */

const env = {
  key: "MySuP3R_z3kr3t.",
  port: 3001,
  port1: 3002,

  databaseConfig: {
    client: "postgresql",
    connection: {
      // host: "192.168.1.104",
      // host: "197.27.92.203",
      host: "localhost",
      port: "5432",
      user: "logistic",
      password: "logistic",
      database: "testlogi",
    },
    debug: true,
    migrations: {
      directory: "migrations",
    },
  },
  assetServerUrl: "http://localhost",
  assetDirectory: "\\home\\logistic258\\Documents\\ites\\logistic",
};

module.exports = env;
