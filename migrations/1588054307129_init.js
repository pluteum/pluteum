/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    uuid: "string",
    first_name: "string",
    last_name: "string",
    email: "string",
    password: "string",
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("libraries", {
    id: "id",
    uuid: "string",
    title: "string",
    language: "string",
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("users_libraries_link", {
    id: "id",
    user: {
      type: "integer",
      notNull: true,
      references: "users",
    },
    library: {
      type: "integer",
      notNull: true,
      references: "libraries",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users_libraries_link");
  pgm.dropTable("users");
  pgm.dropTable("libraries");
};
