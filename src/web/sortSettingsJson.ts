import { sortJsonc } from 'sort-jsonc';
import {
  defaultCommonlyUsedSettings as commonlyUsed,
  ITOCEntry,
  tocData,
} from './tocTree';
import { settingMatches } from './utils';

// For example, [markdown]
function isLangSetting(key: string) {
  return key.startsWith('[');
}

export function sortSettingsJson(
  json: string,
  noCommonlyUsed: boolean,
): string {
  return sortJsonc(json, {
    sort(key1, key2) {
      if (isLangSetting(key1) && !isLangSetting(key2)) {
        return 1;
      } else if (!isLangSetting(key1) && isLangSetting(key2)) {
        return -1;
      } else if (isLangSetting(key1) && isLangSetting(key2)) {
        return key1.localeCompare(key2);
      } else {
        const order1 = calcOrder(commonlyUsed, noCommonlyUsed, tocData, key1);
        const order2 = calcOrder(commonlyUsed, noCommonlyUsed, tocData, key2);
        // also handles when both `order1` and `order2` equal `Infinity`.
        if (order1 === order2) {
          return key1.localeCompare(key2);
        } else {
          return order1 - order2;
        }
      }
    },
  });
}

/**
 *  cache for calcTocDataOrder
 * */
const cache = new Map<string, number>();

function calcOrder(
  commonlyUsed: string[],
  noCommonlyUsed: boolean,
  tocData: ITOCEntry<string>,
  key: string,
) {
  if (!noCommonlyUsed && commonlyUsed.includes(key)) {
    return commonlyUsed.indexOf(key);
  } else if (cache.has(key)) {
    return cache.get(key)!;
  } else {
    const { found, current } = calcTocDataOrder(tocData, key, {
      found: false,
      current: commonlyUsed.length,
    });
    const order = found ? current : Infinity;
    cache.set(key, order);
    return order;
  }
}

type Result = { found: boolean; current: number };

function calcTocDataOrder(
  tocData: ITOCEntry<string>,
  key: string,
  order: Result = { found: false, current: 0 },
): Result {
  let next = order.current + (tocData.settings?.length ?? 0);

  if (tocData.children) {
    for (const child of tocData.children) {
      const { found, current } = calcTocDataOrder(child, key, {
        found: false,
        current: next,
      });
      if (found) {
        return { found, current };
      }
      next = current;
    }
  }

  if (tocData.settings) {
    for (const [index, pattern] of tocData.settings.entries()) {
      if (settingMatches(key, pattern)) {
        return {
          found: true,
          current: order.current + index + 1,
        };
      }
    }
  }

  return { found: false, current: next };
}
