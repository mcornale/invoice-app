export const isEmpty = (val: string) => val === '';
export const isNull = (val: unknown) => val === null;
export const isPositive = (val: number) => val > 0;
export const isEmail = (val: string) => val.includes('@');
