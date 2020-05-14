/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    uuid: "string",
    firstName: "string",
    lastName: "string",
    email: { type: "string", notNull: true, unique: true },
    password: { type: "string", notNull: true, unique: true },
    refreshToken: "string",
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("libraries", {
    id: "id",
    uuid: "string",
    title: "string",
    language: { type: "string", default: "en-us" },
    createdAt: {
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
    default: { type: "boolean", default: false },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users_libraries_link");
  pgm.dropTable("users");
  pgm.dropTable("libraries");
};