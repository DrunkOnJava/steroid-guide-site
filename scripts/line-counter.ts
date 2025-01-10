[object Promise]#!/usr/bin/env node

import { watch } from "fs";
import { readdir, readFile, writeFile } from "fs/promises";
import { resolve, relative } from "path";
import { debounce } from "./utils.js";

// Configuration
const DEBOUNCE_MS = 500;
const OUTPUT_FILE = "lines-of-code.md";
const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "coverage",
]);
const IGNORED_FILES = new Set([
  OUTPUT_FILE,
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
]);

interface FileLineCount {
  path: string;
  lines: number;
}

// Get line count for a single file
async function getFileLineCount(filePath: string): Promise<number> {
  try {
    const content = await readFile(filePath, "utf-8");
    return content.split("\n").length;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return 0;
  }
}

// Get all files recursively
async function* getFiles(dir: string): AsyncGenerator<string> {
  const dirents = await readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const path = resolve(dir, dirent.name);

    // Skip ignored directories and files
    if (IGNORED_DIRS.has(dirent.name) || IGNORED_FILES.has(dirent.name)) {
      continue;
    }

    if (dirent.isDirectory()) {
      yield* getFiles(path);
    } else {
      yield path;
    }
  }
}

// Update line counts for all files
async function updateLineCounts(): Promise<void> {
  const fileCounts: FileLineCount[] = [];
  const rootDir = process.cwd();

  try {
    for await (const filePath of getFiles(rootDir)) {
      const relativePath = relative(rootDir, filePath);
      const lineCount = await getFileLineCount(filePath);
      fileCounts.push({ path: relativePath, lines: lineCount });
    }

    // Sort by line count (descending)
    fileCounts.sort((a, b) => b.lines - a.lines);

    // Generate markdown content
    const content = [
      "# Lines of Code",
      "",
      "Auto-generated file showing line counts for all files in the project.",
      "Updates automatically when files change.",
      "",
      "| File | Lines |",
      "|------|-------|",
      ...fileCounts.map(({ path, lines }) => `| ${path} | ${lines} |`),
      "",
      `*Last updated: ${new Date().toLocaleString()}*`,
    ].join("\n");

    await writeFile(OUTPUT_FILE, content);
    console.log("Updated line counts");
  } catch (error) {
    console.error("Error updating line counts:", error);
  }
}

// Debounced update function
const debouncedUpdate = debounce(updateLineCounts, DEBOUNCE_MS);

// Watch for file changes
function watchFiles(): void {
  const rootDir = process.cwd();

  watch(rootDir, { recursive: true }, (_eventType, filename) => {
    if (!filename) return;

    // Skip ignored files
    const parts = filename.split("/");
    if (
      parts.some((part) => IGNORED_DIRS.has(part)) ||
      IGNORED_FILES.has(filename)
    ) {
      return;
    }

    console.log(`File changed: ${filename}`);
    debouncedUpdate();
  });

  console.log("Watching for file changes...");
  // Initial update
  debouncedUpdate();
}

// Start watching
watchFiles();
