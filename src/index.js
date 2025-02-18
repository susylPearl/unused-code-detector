import chalk from "chalk";
import { ESLint } from "eslint";
import fs from "fs";
import path from "path";
import { SUPPORTED_EXTENSIONS } from "../config/settings.js";
import eslintConfig from "../lib/eslint-config.js";
import { saveHtmlReport, saveJsonReport } from "../lib/report.js";

// Track processed files to avoid duplicates
const processedFiles = new Set();

async function checkUnusedCode(filePath) {
  // Store all issues found
  let findings = [];
  const eslint = new ESLint(eslintConfig);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    console.log(fileContent);
    const results = await eslint.lintText(fileContent, { filePath });
    console.log(results);

    results.forEach((result) => {
      console.log(JSON.stringify(result.messages));
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
  return findings;
}

async function processFiles(files) {
  let findings = [];
  console.log(chalk.blue("Scanning files..."));

  for (const file of files) {
    try {
      // Check if the file has already been processed
      if (processedFiles.has(file)) {
        continue; // Skip if already processed
      }

      const stats = fs.statSync(file);
      if (stats.isDirectory()) {
        const dirFiles = fs.readdirSync(file).map((f) => path.join(file, f));
        await processFiles(dirFiles); // Recursively process directory
      } else if (stats.isFile() && isSupportedFile(file)) {
        console.log(chalk.green(`Analyzing file: ${file}`));
        const fileFindings = await checkUnusedCode(file);

        // Filter out duplicate findings for the same file
        const uniqueFindings = fileFindings.filter(
          (finding) =>
            !findings.some(
              (existing) =>
                existing.file === file && existing.line === finding.line
            )
        );
        // Add new findings to the main findings array
        findings.push(...uniqueFindings);
        processedFiles.add(file); // Mark file as processed
      } else {
        console.log(chalk.dim(`Skipping non-JavaScript file: ${file}`));
      }
    } catch (error) {
      console.error(chalk.red(`Error processing file: ${file}`), error.message);
    }
  }

  // Only generate reports if we’re in the top-level invocation
  if (findings.length > 0 && files[0] === files[files.length - 1]) {
    saveJsonReport(findings);
    saveHtmlReport(findings);
  }
}

const isSupportedFile = (file) => {
  return SUPPORTED_EXTENSIONS.includes(path.extname(file));
};

export { processFiles };
