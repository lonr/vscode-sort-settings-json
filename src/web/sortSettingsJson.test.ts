import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { sortSettingsJson } from './sortSettingsJson';

const fixturesFolder = path.join(__dirname, 'test/fixtures');

void test('sortSettingsJson - settings.json', async function () {
  const settingsJson = await readFile(
    path.join(fixturesFolder, 'settings.json'),
    'utf-8',
  );
  const sortedJson = await readFile(
    path.join(fixturesFolder, 'sorted.json'),
    'utf-8',
  );
  // TODO: deal with the newline at the end of the file
  assert.strictEqual(sortedJson, sortSettingsJson(settingsJson));
});

void test('sortSettingsJson - defaultSettings.json', async function () {
  const defaultSettingsJson = await readFile(
    path.join(fixturesFolder,'defaultSettings.json'),
    'utf-8',
  );
  const defaultSortedJson = await readFile(
    path.join(fixturesFolder,'defaultSorted.json'),
    'utf-8',
  );
  // TODO: deal with the newline at the end of the file
  assert.strictEqual(defaultSortedJson, sortSettingsJson(defaultSettingsJson));
});
