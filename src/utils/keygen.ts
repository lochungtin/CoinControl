const base: number = Math.pow(2, 32);
const sbase: number = Math.pow(2, 16);

export const keygen = (): string => Math.floor(Math.random() * base).toString(16);
export const smallKeygen = (): string => Math.floor(Math.random() * sbase).toString(16);
