exports.up = function (knex) {
  return knex.schema
    .createTable("agence", function (table) {
      table.uuid("id").notNullable().primary();
      table.integer("phone_number");
      table.string("address");
      table.string("city");
      table.string("name");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("vehicule", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("matricule");
      table.integer("status").defaultTo(0);
      table.string("modele");
      table.string("capacity");
      table.uuid("agence").references("id").inTable("agence");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("zone", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("city");
      table.uuid("agence").references("id").inTable("agence");
      table.string("name");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("app_user", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("firstname");
      table.string("lastname");
      table.string("username");
      table.integer("phone_number");
      table.string("status").defaultTo("ACTIVE");
      table.string("email");
      table.string("address");
      table.string("descriminator");
      table.string("imageRef");
      table.string("password");
      table.uuid("agence").references("id").inTable("agence");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("provider", function (table) {
      table
        .uuid("id")
        .notNullable()
        .primary()
        .references("id")
        .inTable("app_user");
      table.string("code_fiscal");
      table.string("code_postal");
      table.string("company");
      table.integer("phone_number");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("colis", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("name_complete");
      table.integer("phone_number");
      table.string("email");
      table.string("payment_status");
      table.integer("status_delivery_exchange").defaultTo(0);
      table.string("code_postal");
      table.double("price");
      table.double("weight");
      table.string("type_envoi");
      table.string("payment_mode");
      table.string("designation");
      table.string("city");
      table.string("address");
      table.string("gouvernorat");
      table.uuid("agence").references("id").inTable("agence");
      table.uuid("provider").references("id").inTable("provider");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("driver", function (table) {
      table
        .uuid("id")
        .notNullable()
        .primary()
        .references("id")
        .inTable("app_user");
      table.uuid("vehicule").references("id").inTable("vehicule");
      table.uuid("zone").references("id").inTable("zone");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("article", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("article");
      table.string("code");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("scale", function (table) {
      table.uuid("id").notNullable().primary();
      table.uuid("article").references("id").inTable("article");
      table.double("price_initial");
      table.double("poids_initial");
      table.double("poids_supplimentaire");

      table.uuid("provider").references("id").inTable("provider");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("permission", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("name");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("user_permission", function (table) {
      table.uuid("users").references("id").inTable("app_user");
      table.uuid("permissions").references("id").inTable("permission");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("privilege", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("name");
      table.string("description");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("user_privilege", function (table) {
      table.uuid("users").references("id").inTable("app_user");
      table.uuid("privileges").references("id").inTable("privilege");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("anomaly_category", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("name");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("anomaly_message", function (table) {
      table.uuid("id").notNullable().primary();

      table.string("message");
      table.uuid("category").references("id").inTable("anomaly_category");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("colis_history", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("action");
      table.string("actionneurs");
      table.string("event");
      table.uuid("colis").references("id").inTable("colis");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("pickup", function (table) {
      table.uuid("id").notNullable().primary();
      table.string("code");
      table.integer("status_pickup").defaultTo(0);
      table.integer("check_magasinier").defaultTo(0);
      table.integer("status_anomaly").defaultTo(0);
      table.integer("check_replanification").defaultTo(0);
      table.dateTime("date_check_magasinier");
      table.dateTime("date_enlevement");
      table.dateTime("date_enlevement_souhaiter");
      table.uuid("colis").references("id").inTable("colis");
      table.uuid("driver").references("id").inTable("driver");
      table.uuid("magasinier").references("id").inTable("app_user");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("anomaly_pickup", function (table) {
      table.uuid("id").notNullable().primary();
      table.uuid("pickup").references("id").inTable("pickup");
      table.uuid("driver").references("id").inTable("driver");
      table.uuid("anomaly").references("id").inTable("anomaly_message");
      table.string("image");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {};
