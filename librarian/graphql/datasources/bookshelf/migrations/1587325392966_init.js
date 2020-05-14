/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("books", {
    id: "id",
    uuid: "string",
    library: {
      type: "string",
      notNull: true,
    },
    title: { type: "text", notNull: true },
    isbn: "text",
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
    filePath: "string",
    url: "string",
    format: "string",
    size: "decimal", // in kb
    image: "string",
    processed: { type: "boolean", notNull: false, default: false },
  });

  pgm.createTable("authors", {
    id: "id",
    name: { type: "text", notNull: true },
    library: {
      type: "string",
      notNull: true,
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
  pgm.dropTable("books_files_link");
  pgm.dropTable("books_authors_link");
  pgm.dropTable("books");
  pgm.dropTable("files");
  pgm.dropTable("authors");
};
