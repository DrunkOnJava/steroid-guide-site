[object Promise]#!/usr/bin/env node

/**
 * @fileoverview Script to automatically add standardized headers to all TypeScript and JavaScript files in the project
 * @project     Steroid Guide Site (v1.0.0)
 * @module      add-file-headers.js/add-file-headers.js
 *
 * @author      [Your Name] <your.email@example.com>
 * @contributors
 * @maintainer  [Your Name] <your.email@example.com>
 *
 * @created     2025-01-09
 * @modified    2025-01-09
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2025 Steroid Guide
 *
 * @description
 * This script recursively walks through the project directory and adds standardized JSDoc headers
 * to all TypeScript and JavaScript files that don't already have them. It automatically:
 * - Detects and lists actual dependencies used in each file
 * - Generates appropriate descriptions based on file type and location
 * - Creates relevant code examples based on the file type
 * - Maintains consistent metadata across all files
 *
 * @example
 * ```js
 * // Run from package.json script
 * npm run add-headers
 *
 * // Or run directly
 * node scripts/add-file-headers.js
 * ```
 *
 * @dependencies
 * - fs/promises (Node.js built-in)
 * - path (Node.js built-in)
 *
 * @requirements
 * [List any specific requirements for this file]
 */

import fs from "fs/promises";
import path from "path";

const PROJECT_ROOT = process.cwd();
const IGNORED_DIRS = ["node_modules", "dist", "build", ".git"];
const VALID_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

// Get file content to analyze imports
const getFileImports = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const importLines =
      content.match(/^import .+ from ['"].+['"];?\s*$/gm) || [];
    return importLines
      .map((line) => {
        const match = line.match(/from ['"](.+)['"]/);
        return match ? match[1] : null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error(`Error reading imports from ${filePath}:`, error);
    return [];
  }
};

// Get package dependencies based on imports
const getPackageDependencies = (imports, packageJson) => {
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  const usedDeps = new Set();

  imports.forEach((imp) => {
    const pkgName = imp.startsWith(".") ? null : imp.split("/")[0];
    if (pkgName && allDeps[pkgName]) {
      usedDeps.add(`${pkgName}@${allDeps[pkgName].replace("^", "")}`);
    }
  });

  return Array.from(usedDeps);
};

// Generate description based on file path and type
const generateDescription = (filePath, moduleType, subModule) => {
  const fileName = path.basename(filePath, path.extname(filePath));

  const descriptions = {
    components: {
      ui: `React UI component that implements the ${fileName} interface element following the project's design system.`,
      default: `React component that implements the ${fileName} functionality.`,
    },
    pages: `React page component that implements the ${fileName} view.`,
    types: `TypeScript type definitions for ${fileName}.`,
    data: `Data module containing ${fileName} related constants and configurations.`,
    default: `Implementation file for ${fileName} functionality.`,
  };

  if (moduleType === "components" && subModule === "ui") {
    return descriptions.components.ui;
  } else if (moduleType === "components") {
    return descriptions.components.default;
  } else if (moduleType in descriptions) {
    return descriptions[moduleType];
  }
  return descriptions.default;
};

// Header template function that generates a header with basic file info
const generateHeader = async (filePath) => {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath);
  const today = new Date().toISOString().split("T")[0];

  // Determine module name from file path
  const moduleSegments = relativePath.split(path.sep);
  const moduleType = moduleSegments[1] || ""; // e.g., 'components', 'pages'
  const subModule = moduleSegments[2] || ""; // e.g., 'ui', 'layout'
  const moduleName = [moduleType, subModule, fileName]
    .filter(Boolean)
    .join("/");

  // Get imports and dependencies
  const imports = await getFileImports(filePath);
  const packageJson = JSON.parse(
    await fs.readFile(path.join(PROJECT_ROOT, "package.json"), "utf8")
  );
  const dependencies = getPackageDependencies(imports, packageJson);

  // Generate appropriate description
  const description = generateDescription(filePath, moduleType, subModule);

  // Generate example based on file type
  let example = "";
  if (ext === ".tsx" || ext === ".jsx") {
    const componentName = path.basename(filePath, ext);
    example = `import { ${componentName} } from './${componentName}';\n\n// Example usage in a React component:\nfunction App() {\n  return <${componentName} />;\n}`;
  } else if (ext === ".ts") {
    const typeName = path.basename(filePath, ext);
    example = `import { ${typeName} } from './${typeName}';\n\n// Example usage:\nconst instance: ${typeName} = {\n  // Add properties here\n};`;
  }

  return `/**
 * @fileoverview ${description}
 * @project     Steroid Guide Site (v${packageJson.version})
 * @module      ${moduleName}
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @contributors
 * @maintainer  Steroid Guide Team <team@steroidguide.com>
 *
 * @created     ${today}
 * @modified    ${today}
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) ${new Date().getFullYear()} Steroid Guide
 *
 * @description
 * ${description}
 *
 * @example
 * \`\`\`js
 * ${example}
 * \`\`\`
 *
 * @dependencies
 * ${
   dependencies.length ? dependencies.join("\n * ") : "No external dependencies"
 }
 *
 * @requirements
 * - Node.js >= 18.0.0
 * - TypeScript >= 5.6.2
 */

`;
};

// Check if file already has a header
const hasHeader = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return content.trimStart().startsWith("/**");
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return false;
  }
};

// Process a single file
const processFile = async (filePath) => {
  try {
    // Check if file already has a header
    if (await hasHeader(filePath)) {
      console.log(`Skipping ${filePath} - header already exists`);
      return;
    }

    // Read existing content
    const content = await fs.readFile(filePath, "utf8");

    // Generate header for this file
    const header = generateHeader(filePath);

    // Combine header with existing content
    const newContent = header + content;

    // Write back to file
    await fs.writeFile(filePath, newContent, "utf8");
    console.log(`Added header to ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Recursively walk directory
const walkDir = async (dir) => {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    // Skip ignored directories
    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.includes(file)) {
        await walkDir(filePath);
      }
      continue;
    }

    // Process only valid file types
    const ext = path.extname(file);
    if (VALID_EXTENSIONS.includes(ext)) {
      await processFile(filePath);
    }
  }
};

// Main execution
const main = async () => {
  try {
    console.log("Adding file headers to project files...");
    await walkDir(PROJECT_ROOT);
    console.log("Completed adding file headers");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

main();
