import { sortJsonc } from 'sort-jsonc';
import { defaultCommonlyUsedSettings as commonlyUsed, ITOCEntry, tocData } from './tocTree';
import { settingMatches } from './utils';

// For example, [markdown]
function isLangSetting(key: string) {
  return key.startsWith('[');
}

export function sortSettingsJson(json: string): string {
  return sortJsonc(json, {
    sort(key1, key2) {
      if (isLangSetting(key1) && !isLangSetting(key2)) {
        return 1;
      } else if (!isLangSetting(key1) && isLangSetting(key2)) {
        return -1;
      } else if (isLangSetting(key1) && isLangSetting(key2)) {
        return key1.localeCompare(key2);
      } else {
        const order1 = calcOrder(commonlyUsed, tocData, key1);
        const order2 = calcOrder(commonlyUsed, tocData, key2);
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

function calcOrder(
  commonlyUsed: string[],
  tocData: ITOCEntry<string>,
  key: string,
) {
  if (commonlyUsed.includes(key)) {
    return commonlyUsed.indexOf(key);
  }

  return commonlyUsed.length + calcOrderOfTocData(tocData, key);
}

const orderCache = new Map<string, number>();

type Result = { found: boolean; current: number };

function calcOrderOfTocData(tocData: ITOCEntry<string>, key: string): number {
  if (orderCache.has(key)) {
    return orderCache.get(key)!;
  }

  const { found, current } = calcOrderOfTocDataHelper(tocData, key);
  const order = found ? current : Infinity;
  orderCache.set(key, order);
  return order;
}

function calcOrderOfTocDataHelper(
  tocData: ITOCEntry<string>,
  key: string,
  order: Result = { found: false, current: 0 },
): Result {
  let next = order.current + (tocData.settings?.length ?? 0);

  if (tocData.children) {
    for (const child of tocData.children) {
      const { found, current } = calcOrderOfTocDataHelper(child, key, {
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
