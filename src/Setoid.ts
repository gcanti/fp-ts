/** @typeclass */
export interface Setoid<A> {
  equals: (x: A, y: A) => boolean
}

/** @function */
export const strictEqual = <A>(a: A, b: A): boolean => {
  return a === b
}

const setoidStrict = { equals: strictEqual }

/** @instance */
export const setoidString: Setoid<string> = setoidStrict

/** @instance */
export const setoidNumber: Setoid<number> = setoidStrict

/** @instance */
export const setoidBoolean: Setoid<boolean> = setoidStrict

/** @function */
export const getArraySetoid = <A>(S: Setoid<A>): Setoid<Array<A>> => {
  return {
    equals: (xs, ys) => xs.length === ys.length && xs.every((x, i) => S.equals(x, ys[i]))
  }
}

/** @function */
export const getRecordSetoid = <O extends { [key: string]: any }>(
  setoids: { [K in keyof O]: Setoid<O[K]> }
): Setoid<O> => {
  return {
    equals: (x, y) => {
      for (const k in setoids) {
        if (!setoids[k].equals(x[k], y[k])) {
          return false
        }
      }
      return true
    }
  }
}

/** @function */
export const getProductSetoid = <A, B>(SA: Setoid<A>, SB: Setoid<B>): Setoid<[A, B]> => {
  return {
    equals: ([xa, xb], [ya, yb]) => SA.equals(xa, ya) && SB.equals(xb, yb)
  }
}
