module.exports = {
  apps: [
    {
      name: "Librarian",
      script: "./node_modules/.bin/ts-node",
      args: "index.ts",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};
