import { sortJsonc } from 'sort-jsonc';
import { ITOCEntry, tocData } from './tocTree';
import { settingMatches } from './utils';

export function sortSettingsJson(json: string): string {
  return sortJsonc(json, {
    sort(key1, key2) {
      if (key1.startsWith('[') && !key2.startsWith('[')) {
        return 1;
      } else if (!key1.startsWith('[') && key2.startsWith('[')) {
        return -1;
      } else if (key1.startsWith('[') && key2.startsWith('[')) {
        return key1.localeCompare(key2);
      } else {
        const order1 = calcOrder(tocData, key1);
        const order2 = calcOrder(tocData, key2);
        if (order1 === Infinity && order2 === Infinity) {
          return key1.localeCompare(key2);
        } else {
          return order1 - order2;
        }
      }
    },
  });
}

type Result = { found: boolean; current: number };

function calcOrder(tocData: ITOCEntry<string>, key: string): number {
  const { found, current } = calcOrderHelper(tocData, key);
  return found ? current : Infinity;
}

function calcOrderHelper(
  tocData: ITOCEntry<string>,
  key: string,
  order: Result = { found: false, current: 0 }
): Result {
  let next = order.current + (tocData.settings?.length ?? 0);

  if (tocData.children) {
    for (const child of tocData.children) {
      const { found, current } = calcOrderHelper(child, key, {
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
