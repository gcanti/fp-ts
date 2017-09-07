export interface Semigroup<A> {
  concat: (x: A) => (y: A) => A
}

export const fold = <A>(S: Semigroup<A>) => (a: A) => (as: Array<A>): A => {
  return as.reduce((acc, a) => S.concat(acc)(a), a)
}

export const getFirstSemigroup = <A>(): Semigroup<A> => ({ concat: x => y => x })

export const getLastSemigroup = <A>(): Semigroup<A> => ({ concat: x => y => y })

export const getProductSemigroup = <A, B>(SA: Semigroup<A>, SB: Semigroup<B>): Semigroup<[A, B]> => ({
  concat: ([xa, xb]) => ([ya, yb]) => [SA.concat(xa)(ya), SB.concat(xb)(yb)]
})

export const getDualSemigroup = <A>(S: Semigroup<A>): Semigroup<A> => ({
  concat: x => y => S.concat(y)(x)
})

export const getRecordSemigroup = <O extends { [key: string]: any }>(
  semigroups: { [K in keyof O]: Semigroup<O[K]> }
): Semigroup<{ [K in keyof O]: O[K] }> => ({
  concat: x => y => {
    const r: any = {}
    for (const k in semigroups) {
      r[k] = semigroups[k].concat(x[k])(y[k])
    }
    return r
  }
})
