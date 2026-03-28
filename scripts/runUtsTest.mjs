#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

let scriptDir = path.dirname(fileURLToPath(import.meta.url));
if (os.platform() === "win32") {
  scriptDir = scriptDir.replace(/^\/([a-zA-Z])\//, "$1:/");
}
const repoRoot = path.resolve(scriptDir, "..");
const sourceDir = path.resolve(repoRoot, "uni_modules/uts-tests/utssdk");
const tsOutputDir = path.resolve(scriptDir, "dist/ts");
const jsOutputDir = path.resolve(scriptDir, "dist/js");
const nativeEntryDir = path.resolve(scriptDir, "nativeJsEntry");

const platformFlags = {
  WEB: true,
};

function isIdentifierChar (char) {
  return /[A-Z0-9-]/.test(char);
}

function tokenize (expression) {
  const tokens = [];
  let index = 0;

  while (index < expression.length) {
    const char = expression[index];

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (char === "(" || char === ")" || char === "!") {
      tokens.push(char);
      index += 1;
      continue;
    }

    if (expression.startsWith("&&", index) || expression.startsWith("||", index)) {
      tokens.push(expression.slice(index, index + 2));
      index += 2;
      continue;
    }

    if (isIdentifierChar(char)) {
      let end = index + 1;
      while (end < expression.length && isIdentifierChar(expression[end])) {
        end += 1;
      }
      tokens.push(expression.slice(index, end));
      index = end;
      continue;
    }

    throw new Error(`Unsupported token "${char}" in expression: ${expression}`);
  }

  return tokens;
}

function evaluateExpression (expression) {
  const tokens = tokenize(expression.trim());
  let index = 0;

  function peek () {
    return tokens[index];
  }

  function consume (expected) {
    const token = tokens[index];
    if (expected && token !== expected) {
      throw new Error(`Expected "${expected}" but found "${token}" in expression: ${expression}`);
    }
    index += 1;
    return token;
  }

  function parsePrimary () {
    const token = peek();

    if (token === "!") {
      consume("!");
      return !parsePrimary();
    }

    if (token === "(") {
      consume("(");
      const value = parseOr();
      consume(")");
      return value;
    }

    if (!token) {
      throw new Error(`Unexpected end of expression: ${expression}`);
    }

    consume();
    return Boolean(platformFlags[token]);
  }

  function parseAnd () {
    let value = parsePrimary();
    while (peek() === "&&") {
      consume("&&");
      const right = parsePrimary();
      value = value && right;
    }
    return value;
  }

  function parseOr () {
    let value = parseAnd();
    while (peek() === "||") {
      consume("||");
      const right = parseAnd();
      value = value || right;
    }
    return value;
  }

  const result = parseOr();
  if (index !== tokens.length) {
    throw new Error(`Unexpected trailing tokens in expression: ${expression}`);
  }
  return result;
}

function walkFiles (dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const filePaths = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      filePaths.push(...walkFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".uts")) {
      filePaths.push(entryPath);
    }
  }

  return filePaths;
}

function detectEol (content) {
  return content.includes("\r\n") ? "\r\n" : "\n";
}

function rewriteRelativeImports (content) {
  return content
    .replace(/(from\s*["'])(\.{1,2}\/[^"']+)\.uts(["'])/g, "$1$2$3")
    .replace(/(import\s*\(\s*["'])(\.{1,2}\/[^"']+)\.uts(["']\s*\))/g, "$1$2$3");
}

function transformContent (original, filePath) {
  const eol = detectEol(original);
  const trailingEol = original.endsWith("\r\n") || original.endsWith("\n");
  const lines = original.split(/\r?\n/);

  if (trailingEol && lines.at(-1) === "") {
    lines.pop();
  }

  const output = [];
  const stack = [];

  for (const line of lines) {
    const match = line.match(/^\s*\/\/\s*#(ifdef|ifndef|if|elif|else|endif)\b(.*)$/);
    if (!match) {
      const isActive = stack.every((frame) => frame.keep);
      if (isActive) {
        output.push(line);
      }
      continue;
    }

    const [, type, rest] = match;
    const expression = rest.trim();

    if (type === "ifdef" || type === "ifndef") {
      const parentActive = stack.every((frame) => frame.keep);
      const condition = type === "ifdef" ? evaluateExpression(expression) : !evaluateExpression(expression);
      stack.push({ keep: parentActive && condition });
      continue;
    }

    if (type === "endif") {
      if (stack.length === 0) {
        throw new Error(`Unmatched #endif in ${filePath}`);
      }
      stack.pop();
      continue;
    }

    throw new Error(`Unsupported directive #${type} in ${filePath}`);
  }

  if (stack.length !== 0) {
    throw new Error(`Unclosed conditional block in ${filePath}`);
  }

  const transformed = output.join(eol) + (trailingEol ? eol : "");
  return rewriteRelativeImports(transformed);
}

function ensureCleanOutputDir (dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDirectoryContents (sourcePath, targetPath) {
  const entries = fs.readdirSync(sourcePath, { withFileTypes: true });

  for (const entry of entries) {
    const entrySourcePath = path.join(sourcePath, entry.name);
    const entryTargetPath = path.join(targetPath, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(entryTargetPath, { recursive: true });
      copyDirectoryContents(entrySourcePath, entryTargetPath);
      continue;
    }

    fs.mkdirSync(path.dirname(entryTargetPath), { recursive: true });
    fs.copyFileSync(entrySourcePath, entryTargetPath);
  }
}

function runTypeScriptBuild (cwd) {
  const defaultTscCommand = os.platform() === "win32"
    ? path.join(scriptDir, "node_modules", ".bin", "tsc.cmd")
    : path.join(scriptDir, "node_modules", ".bin", "tsc");
  const tscCommand = process.env.TSC_BIN ?? defaultTscCommand;

  if (!fs.existsSync(tscCommand)) {
    throw new Error(`TypeScript compiler not found: ${tscCommand}`);
  }

  const result = spawnSync(tscCommand, [], {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`TypeScript compilation failed with exit code ${result.status ?? "unknown"}.`);
  }
}

function runGeneratedEntry (jsDir) {
  const entryPath = path.join(jsDir, "entry.js");
  if (!fs.existsSync(entryPath)) {
    throw new Error(`Generated entry not found: ${entryPath}`);
  }

  const result = spawnSync(process.execPath, [entryPath], {
    cwd: jsDir,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.error) {
    throw result.error;
  }
}

if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
  throw new Error(`Source directory not found: ${sourceDir}`);
}

if (!fs.existsSync(nativeEntryDir) || !fs.statSync(nativeEntryDir).isDirectory()) {
  throw new Error(`Native entry directory not found: ${nativeEntryDir}`);
}

ensureCleanOutputDir(tsOutputDir);
ensureCleanOutputDir(jsOutputDir);

const filePaths = walkFiles(sourceDir);
const writtenFiles = [];

for (const filePath of filePaths) {
  const original = fs.readFileSync(filePath, "utf8");
  const next = transformContent(original, filePath);
  const relativePath = path.relative(sourceDir, filePath);
  const outputPath = path.join(tsOutputDir, relativePath.replace(/\.uts$/i, ".ts"));

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, next, "utf8");
  writtenFiles.push(path.relative(repoRoot, outputPath));
}

copyDirectoryContents(nativeEntryDir, tsOutputDir);

console.log(`Processed ${filePaths.length} .uts files from ${path.relative(repoRoot, sourceDir)}.`);
console.log(`Wrote ${writtenFiles.length} generated TypeScript files to ${path.relative(repoRoot, tsOutputDir)}.`);
console.log(`Copied nativeJsEntry helpers from ${path.relative(repoRoot, nativeEntryDir)} to ${path.relative(repoRoot, tsOutputDir)}.`);

for (const filePath of writtenFiles) {
  console.log(filePath);
}

runTypeScriptBuild(tsOutputDir);

console.log(`Built JavaScript output to ${path.relative(repoRoot, jsOutputDir)}.`);
console.log(`Running generated entry: ${path.relative(repoRoot, path.join(jsOutputDir, "entry.js"))}`);

runGeneratedEntry(jsOutputDir);
