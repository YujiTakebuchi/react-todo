const ssi = require("./node_modules/browsersync-ssi");

module.exports = {
  startPath: "./",
  port: 3300,
  files: ["./dist/**/*.css", "./dist/**/*.html", "./dist/**/*.js"],
  server: {
    baseDir: "./dist/",
  },
  middleware: ssi({
    baseDir: "./dist/",
    ext: ".html",
  }),
  ghostMode: false,
  browser: "google chrome",
  open: "local",
};
