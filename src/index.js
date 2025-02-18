// const fs = require('fs');
// const path = require('path');
// const chalk = require('chalk'); // Import chalk
// const { ESLint } = require('eslint');
// const eslintConfig = require('../lib/eslint-config');
// const { saveJsonReport, saveHtmlReport } = require('../lib/report');

import chalk from "chalk";
import { ESLint } from "eslint";
import fs from "fs";
import path from "path";
import eslintConfig from "../lib/eslint-config.js";
import { saveHtmlReport, saveJsonReport } from "../lib/report.js";

let findings = []; // Store all issues found

async function checkUnusedCode(filePath) {
  const eslint = new ESLint(eslintConfig);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const results = await eslint.lintText(fileContent, { filePath });

    results.forEach((result) => {
      result.messages.forEach((msg) => {
        if (
          msg.ruleId === "no-unused-vars" ||
          msg.ruleId === "unused-imports/no-unused-vars"
        ) {
          findings.push({
            file: filePath,
            message: msg.message,
            line: msg.line,
          });

          console.log(
            chalk.yellowBright("Unused code found:") +
              chalk.white(` ${msg.message} `) +
              chalk.dim(`(File: ${filePath}, Line: ${msg.line})`)
          );
        }
      });
    });
  } catch (err) {
    console.error(chalk.redBright(`Error processing file: ${filePath}`));
    console.error(chalk.red(err.message));
  }
}

async function processFiles(files) {
  console.log(chalk.blue("Scanning files..."));
  for (const file of files) {
    const stats = fs.statSync(file);
    if (stats.isDirectory()) {
      const dirFiles = fs.readdirSync(file).map((f) => path.join(file, f));
      await processFiles(dirFiles); // Recursively process directory
    } else if (stats.isFile() && file.endsWith(".js")) {
      console.log(chalk.green(`Analyzing file: ${file}`));
      await checkUnusedCode(file);
    } else {
      console.log(chalk.dim(`Skipping non-JavaScript file: ${file}`));
    }
  }

  // Generate reports
  saveJsonReport(findings);
  saveHtmlReport(findings);
}

export { processFiles };
