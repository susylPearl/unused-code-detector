#!/usr/bin/env node

import chalk from "chalk";
import path from "path";
import { processFiles } from "../src/index.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(chalk.red("You need to specify files or directories to check."));
  console.log(chalk.greenBright("Usage: $0 <files|directories>"));
  process.exit(1);
}

console.log(chalk.yellowBright("Analyzing files or directories:"), args);

const filePaths = args
  .filter((arg) => !arg.startsWith("-")) // Filter out flags
  .map((file) => path.resolve(file));
console.log(filePaths);

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
