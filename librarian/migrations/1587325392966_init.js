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
    resetToken: "string",
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

  pgm.createTable("books", {
    id: "id",
    uuid: "string",
    library: {
      type: "string",
      notNull: true,
    },
    title: { type: "text", notNull: true },
    rating: { type: "int", default: 0, notNull: true },
    isbn: "text",
    description: "text",
    seriesIndex: { type: "integer", default: 1 },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    lastModifiedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("files", {
    id: "id",
    uuid: "string",
    md5: "string",
    library: {
      type: "string",
      notNull: true,
    },
    name: "string",
    path: "string",
    format: "string",
    size: "decimal", // in kb
    image: "string",
  });

  pgm.createTable("scans", {
    id: "id",
    fileId: "int",
    uuid: "uuid",
    source: "string",
    payload: "string",
    error: "string",
    seen: "boolean",
    queuedAt: "timestamp",
    finishedAt: "timestamp",
  });

  pgm.createTable("authors", {
    id: "id",
    name: { type: "text", notNull: true },
    library: {
      type: "string",
      notNull: true,
    },
  });

  pgm.createTable("tags", {
    id: "id",
    name: "string",
    library: {
      type: "string",
      notNull: true,
    },
  });

  pgm.createTable("books_tags_link", {
    id: "id",
    book: {
      type: "integer",
      notNull: true,
      references: "books",
    },
    tag: {
      type: "integer",
      notNull: true,
      references: "tags",
    },
  });

  pgm.createTable("books_files_link", {
    id: "id",
    book: {
      type: "integer",
      notNull: true,
      references: "books",
    },
    file: {
      type: "integer",
      notNull: true,
      references: "files",
    },
  });

  pgm.createTable("books_authors_link", {
    id: "id",
    book: {
      type: "integer",
      notNull: true,
      references: "books",
    },
    author: {
      type: "integer",
      notNull: true,
      references: "authors",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users_libraries_link");
  pgm.dropTable("users");
  pgm.dropTable("libraries");
  pgm.dropTable("tags");
  pgm.dropTable("books_tags_link");
  pgm.dropTable("books_files_link");
  pgm.dropTable("books_authors_link");
  pgm.dropTable("books");
  pgm.dropTable("files");
  pgm.dropTable("authors");
  pgm.dropTable("scans");
};
