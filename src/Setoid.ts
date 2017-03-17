export interface StaticSetoid<M> {
  equals(x: M, y: M): boolean
}

export function strictEqual(a: any, b: any): boolean {
  return a === b
}

export const setoidString: StaticSetoid<string> = { equals: strictEqual }

export const setoidNumber: StaticSetoid<number> = { equals: strictEqual }

export const setoidBoolean: StaticSetoid<boolean> = { equals: strictEqual }
