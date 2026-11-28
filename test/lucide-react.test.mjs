import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as lucide from 'lucide-react';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

function sourceFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '.next', '.opencode-xdg', 'test'].includes(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      sourceFiles(fullPath, acc);
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function importedIcons(file) {
  const source = readFileSync(file, 'utf8');
  const names = [];
  const importPattern = /import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*['"]lucide-react['"]/g;
  let match;
  while ((match = importPattern.exec(source))) {
    for (const part of match[1].split(',')) {
      const imported = part.trim().split(/\s+as\s+/)[0].trim();
      if (imported) names.push(imported);
    }
  }
  return names;
}

test('every lucide-react icon imported by the app is exported', () => {
  const missing = new Set();

  for (const file of sourceFiles(root)) {
    for (const icon of importedIcons(file)) {
      if (!(icon in lucide)) {
        missing.add(`${icon} (${path.relative(root, file)})`);
      }
    }
  }

  assert.deepEqual([...missing], [], `Unknown lucide-react exports: ${[...missing].join(', ')}`);
});

test('lucide-react provides the icons from the 1.83.0 release', () => {
  const installedVersion = require('lucide-react/package.json').version;
  assert.ok(
    installedVersion.localeCompare('1.83.0', undefined, { numeric: true }) >= 0,
    `lucide-react must be at least 1.83.0, found ${installedVersion}`,
  );

  for (const icon of [
    'MailSend',
    'StairsArrowDownLeft',
    'StairsArrowUpRight',
    'SquareTextAlignBottomCenter',
    'SquareTextAlignBottomLeft',
    'SquareTextAlignBottomRight',
    'ChevronsDownUpOffset',
    'ChevronsRightLeftOffset',
    'BoxingGlove',
    'Balcony',
    'ListClock',
    'PartyPopper',
  ]) {
    assert.ok(icon in lucide, `lucide-react is missing the ${icon} icon`);
  }
});