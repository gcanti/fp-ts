export interface Setoid<M> {
  equals(x: M, y: M): boolean
}

export function strictEqual(a: any, b: any): boolean {
  return a === b
}

export const setoidString: Setoid<string> = { equals: strictEqual }

export const setoidNumber: Setoid<number> = { equals: strictEqual }

export const setoidBoolean: Setoid<boolean> = { equals: strictEqual }
