export const hasSomeTruthyValues = (obj: Object) =>
  Object.values(obj).some(Boolean);
