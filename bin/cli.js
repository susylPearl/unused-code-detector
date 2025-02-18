#!/usr/bin/env node

// const path = require("path");
// const chalk = require("chalk");
// const { processFiles } = require("../src/index");
// const yargs = require("yargs");

import chalk from "chalk";
import path from "path";
import yargs from "yargs";
import { processFiles } from "../src/index.js";

// Debugging: Log the process start
console.log(chalk.blueBright("Debug: Script started"));

const argv = yargs().argv;
//   .usage(chalk.greenBright("Usage: $0 <files|directories>"))
//   .example(
//     "$0 src/",
//     chalk.dim('Analyze all JavaScript files in the "src" directory.')
//   )
//   .positional("files", {
//     describe: "Files or directories to analyze",
//     type: "string",
//   })
//   .help("h")
//   .alias("h", "help")
//   .demandCommand(
//     1,
//     chalk.red("You need to specify files or directories to check.")
//   ).argv;

console.log(chalk.yellowBright("Debug: argv._ =>"), argv._);

const filePaths = argv._.map((file) => path.resolve(file));

console.log(chalk.blueBright("Starting lint-unused... 🚀"));

processFiles(filePaths)
  .then(() => {
    console.log(chalk.greenBright("Processing complete! 🎉"));
    console.log(chalk.cyan("Reports generated in the current directory:"));
    console.log(chalk.yellow("- unused-code-report.json"));
    console.log(chalk.yellow("- unused-code-report.html"));
  })
  .catch((err) => {
    console.error(chalk.redBright("An error occurred during processing:"));
    console.error(chalk.red(err.message));
  });
