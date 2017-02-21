export interface Setoid<M> {
  equals(x: M, y: M): boolean
}

export function equals(a: any, b: any): boolean {
  return a === b
}

export const setoidString: Setoid<string> = { equals }

export const setoidNumber: Setoid<number> = { equals }

export const setoidBoolean: Setoid<boolean> = { equals }
