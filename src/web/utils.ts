/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// https://github.com/microsoft/vscode/blob/76c27ee9ddaf998e5129418b5aba2af1d569cf50/src/vs/nls.ts#L62
export function localize(_key: string, message: string) {
  return message;
}

//github.com/microsoft/vscode/blob/820c961d5acfe86f84cccc70003cc700c2eb2264/src/vs/base/common/strings.ts#L88
/**
 * Escapes regular expression characters in a given string
 */
function escapeRegExpCharacters(value: string): string {
  return value.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
}

// https://github.com/microsoft/vscode/blob/820c961d5acfe86f84cccc70003cc700c2eb2264/src/vs/workbench/contrib/preferences/browser/settingsTree.ts#L460-L562
const settingPatternCache = new Map<string, RegExp>();

function createSettingMatchRegExp(pattern: string): RegExp {
  pattern = escapeRegExpCharacters(pattern).replace(/\\\*/g, '.*');

  return new RegExp(`^${pattern}$`, 'i');
}

export function settingMatches(key: string, pattern: string): boolean {
  let regExp = settingPatternCache.get(pattern);
  if (!regExp) {
    regExp = createSettingMatchRegExp(pattern);
    settingPatternCache.set(pattern, regExp);
  }

  return regExp.test(key);
}
