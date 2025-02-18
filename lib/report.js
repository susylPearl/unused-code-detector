import chalk from "chalk";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Define output file names
const JSON_REPORT_NAME = "unused-code-report.json";
const HTML_REPORT_NAME = "unused-code-report.html";

// Save findings as a JSON report
function saveJsonReport(findings) {
  try {
    const jsonFilePath = path.resolve(JSON_REPORT_NAME);
    fs.writeFileSync(jsonFilePath, JSON.stringify(findings, null, 2), "utf-8");
    console.log(
      chalk.greenBright(`JSON report saved at: ${chalk.yellow(jsonFilePath)}`)
    );
  } catch (err) {
    console.error(
      chalk.redBright("Failed to save JSON report:"),
      chalk.red(err.message)
    );
  }
}

// Save findings as an HTML report
function saveHtmlReport(findings) {
  try {
    const htmlFilePath = path.resolve(HTML_REPORT_NAME);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.resolve(
      __dirname,
      "../templates/report-template.ejs"
    );
    const template = fs.readFileSync(templatePath, "utf-8");

    const htmlContent = ejs.render(template, { findings });
    fs.writeFileSync(htmlFilePath, htmlContent, "utf-8");
    console.log(
      chalk.greenBright(`HTML report saved at: ${chalk.yellow(htmlFilePath)}`)
    );
  } catch (err) {
    console.error(
      chalk.redBright("Failed to save HTML report:"),
      chalk.red(err.message)
    );
  }
}

export { saveHtmlReport, saveJsonReport };
