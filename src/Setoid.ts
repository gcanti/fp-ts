export interface Setoid<A> {
  equals: (x: A) => (y: A) => boolean
}

export const strictEqual = (a: any) => (b: any): boolean => a === b

export const setoidString: Setoid<string> = { equals: strictEqual }

export const setoidNumber: Setoid<number> = { equals: strictEqual }

export const setoidBoolean: Setoid<boolean> = { equals: strictEqual }

export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => ({
  equals: xs => ys => xs.length === ys.length && xs.every((x, i) => S.equals(x)(ys[i]))
})
