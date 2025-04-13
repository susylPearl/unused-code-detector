# unused-code-detector

A command-line tool to find unused variables and functions in JavaScript/TypeScript files.

## Installation

```bash
npm install -g unused-code-detector
```

## Usage

```bash
# Analyze current directory
unused-code-detector

# Analyze specific directory
unused-code-detector ./src

# Analyze with specific file extensions
unused-code-detector --extensions .js,.ts,.tsx

# Generate HTML report
unused-code-detector --html

# Output to specific file
unused-code-detector --output ./report.json
```

## Features

- Finds unused variables and imports
- Supports JavaScript and TypeScript files
- Generates JSON or HTML reports
- Configurable file extensions and ignore patterns
- Interactive mode for reviewing findings

## License

MIT © Chiranjhivi Ghimire
