/** @typeclass */
export interface Setoid<A> {
  equals: (x: A) => (y: A) => boolean
}

/** @function */
export const strictEqual = (a: any) => (b: any): boolean => {
  return a === b
}

/** @instance */
export const setoidString: Setoid<string> = { equals: strictEqual }

/** @instance */
export const setoidNumber: Setoid<number> = { equals: strictEqual }

/** @instance */
export const setoidBoolean: Setoid<boolean> = { equals: strictEqual }

/** @function */
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => {
  return {
    equals: xs => ys => xs.length === ys.length && xs.every((x, i) => S.equals(x)(ys[i]))
  }
}

/** @function */
export const getRecordSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => {
  return {
    equals: x => y => {
      for (const k in setoids) {
        if (!setoids[k].equals(x[k])(y[k])) {
          return false
        }
      }
      return true
    }
  }
}
