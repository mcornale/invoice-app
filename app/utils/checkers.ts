export const isString = (val: unknown): val is string =>
  typeof val === 'string';

export const isArrOfString = (arr: unknown): arr is string[] =>
  Array.isArray(arr) && arr.every((v) => isString(v));

export const hasSomeTruthyValues = (obj: Object) =>
  Object.values(obj).some(Boolean);
